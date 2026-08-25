import dotenv from 'dotenv'

dotenv.config()

export default async function handler(req, res) {
  // CORS Headers for Vercel Serverless Functions
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body || {}

    const name = (body.name || '').trim()
    const company = (body.company || '').trim()
    const workEmail = (body.workEmail || body.email || '').trim()
    const contactNumber = (body.contactNumber || body.phone || '').trim()
    const cargoType = (body.cargoType || body.cargo || '').trim()
    const volumePerMonth = (body.volumePerMonth || body.volume || '').trim()
    const requirements = (body.requirements || body.need || '').trim()

    const validationErrors = {}
    if (!name) validationErrors.name = 'Name is required'
    if (!workEmail) {
      validationErrors.workEmail = 'Work Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
      validationErrors.workEmail = 'Enter a valid email address'
    }

    const phoneDigits = contactNumber.replace(/\D/g, '')
    if (!contactNumber) {
      validationErrors.contactNumber = 'Contact Number is required'
    } else if (phoneDigits.length > 12) {
      validationErrors.contactNumber = 'Contact Number cannot exceed 12 digits'
    }

    if (!cargoType) {
      validationErrors.cargoType = 'Cargo Type is required'
    }

    if (Object.keys(validationErrors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors,
      })
    }

    const notionApiKey = process.env.NOTION_API_KEY
    const rawDbId = process.env.NOTION_DATABASE_ID

    if (!notionApiKey || !rawDbId) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: NOTION_API_KEY or NOTION_DATABASE_ID is missing in environment.',
      })
    }

    const notionDatabaseId = rawDbId.replace(/-/g, '')

    // Fetch Database schema to detect exact column names & property types
    const dbRes = await fetch(`https://api.notion.com/v1/databases/${notionDatabaseId}`, {
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
      },
    })

    const dbData = await dbRes.json()

    if (!dbRes.ok) {
      console.error('Notion DB access error:', dbData)
      if (dbData.code === 'object_not_found' || dbRes.status === 404) {
        return res.status(403).json({
          success: false,
          error: 'Notion Database connection missing: Please share your Notion Database with the "VCC" integration in Notion. (Open Database -> click "..." at top right -> Add connections -> select "VCC").',
          details: dbData,
        })
      }
      return res.status(dbRes.status || 500).json({
        success: false,
        error: dbData.message || 'Could not access Notion Database.',
        details: dbData,
      })
    }

    const dbProps = dbData.properties || {}

    // Helper to find column matching list of candidate names
    const findPropKey = (candidates) => {
      const keys = Object.keys(dbProps)
      for (const cand of candidates) {
        const match = keys.find(k => k.toLowerCase().trim() === cand.toLowerCase().trim())
        if (match) return match
      }
      return null
    }

    const titleKey = Object.keys(dbProps).find(k => dbProps[k].type === 'title') || 'Name'
    const companyKey = findPropKey(['Company', 'Text 1', 'Text1'])
    const emailKey = findPropKey(['Work Email', 'Email', 'WorkEmail'])
    const phoneKey = findPropKey(['Contact Number', 'Phone', 'ContactNumber', 'Text'])
    const cargoKey = findPropKey(['Cargo Type', 'CargoType', 'Cargo', 'Text 2', 'Text2'])
    const volumeKey = findPropKey(['Volume / Month', 'Volume', 'Volume/Month', 'Month', 'Text 3', 'Text3'])
    const reqKey = findPropKey(['Your Requirements', 'Requirements', 'Need', 'Text 4', 'Text4'])
    const dateKey = Object.keys(dbProps).find(k => dbProps[k].type === 'date') || findPropKey(['Date'])

    const properties = {}

    // 1. Title (Name)
    if (titleKey && dbProps[titleKey]) {
      properties[titleKey] = { title: [{ text: { content: name } }] }
    }

    // 2. Company
    if (companyKey && dbProps[companyKey]) {
      const type = dbProps[companyKey].type
      if (type === 'rich_text') properties[companyKey] = { rich_text: company ? [{ text: { content: company } }] : [] }
      else if (type === 'title') properties[companyKey] = { title: [{ text: { content: company } }] }
    }

    // 3. Work Email
    if (emailKey && dbProps[emailKey]) {
      const type = dbProps[emailKey].type
      if (type === 'email') properties[emailKey] = { email: workEmail }
      else if (type === 'rich_text') properties[emailKey] = { rich_text: [{ text: { content: workEmail } }] }
    }

    // 4. Contact Number / Phone
    if (phoneKey && dbProps[phoneKey]) {
      const type = dbProps[phoneKey].type
      if (type === 'phone_number') properties[phoneKey] = { phone_number: contactNumber }
      else if (type === 'rich_text') properties[phoneKey] = { rich_text: [{ text: { content: contactNumber } }] }
    }

    // 5. Cargo Type
    if (cargoKey && dbProps[cargoKey]) {
      const type = dbProps[cargoKey].type
      if (type === 'select') properties[cargoKey] = { select: { name: cargoType } }
      else if (type === 'rich_text') properties[cargoKey] = { rich_text: [{ text: { content: cargoType } }] }
    }

    // 6. Volume / Month
    if (volumeKey && dbProps[volumeKey]) {
      const type = dbProps[volumeKey].type
      if (type === 'rich_text') properties[volumeKey] = { rich_text: volumePerMonth ? [{ text: { content: volumePerMonth } }] : [] }
    }

    // 7. Requirements
    if (reqKey && dbProps[reqKey]) {
      const type = dbProps[reqKey].type
      if (type === 'rich_text') properties[reqKey] = { rich_text: requirements ? [{ text: { content: requirements } }] : [] }
    }

    // 8. Date (current date/time of submission)
    if (dateKey && dbProps[dateKey] && dbProps[dateKey].type === 'date') {
      properties[dateKey] = { date: { start: new Date().toISOString() } }
    }

    // Create page in Notion
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionApiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: notionDatabaseId },
        properties,
      }),
    })

    const notionData = await notionResponse.json()

    if (!notionResponse.ok) {
      console.error('Notion Page Create Error:', notionData)
      return res.status(notionResponse.status || 500).json({
        success: false,
        error: notionData.message || 'Failed to create record in Notion Database.',
        details: notionData,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Request submitted successfully to Notion Database.',
      id: notionData.id,
    })
  } catch (err) {
    console.error('Server Exception:', err)
    return res.status(500).json({
      success: false,
      error: 'Internal server error occurred while submitting quote request.',
      message: err.message,
    })
  }
}
