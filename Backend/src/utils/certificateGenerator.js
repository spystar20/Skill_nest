import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
export const getCertificatePdf = async ({ studentName, courseName, issueDate }) => {
  const browser = await puppeteer.launch({ headless: true })


  try {
    const page = await browser.newPage()
    console.log('Current working directory:', process.cwd())
const badgePath = path.resolve('../Frontend/src/assets/badge.png')
console.log('Badge path:', badgePath)
console.log('Badge exists:', fs.existsSync(badgePath))
const badgePng = `file://${badgePath}`
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            background: white;
          }

          .outer-certificate {
            position: relative;
            width: 1000px;
            height: 550px;
            padding: 12px;
            background:
              radial-gradient(
                circle at 20% 15%,
                rgba(170, 210, 235, 0.45),
                transparent 30%
              ),
              radial-gradient(
                circle at 75% 70%,
                rgba(220, 235, 245, 0.5),
                transparent 35%
              ),
              repeating-linear-gradient(
                90deg,
                rgba(70, 100, 120, 0.07) 0 1px,
                transparent 1px 50px
              ),
              repeating-linear-gradient(
                0deg,
                rgba(70, 100, 120, 0.07) 0 1px,
                transparent 1px 50px
              );
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
          }

          .inner-certificate {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border: 2px solid black;
            padding: 24px;
            background:
              radial-gradient(
                circle at 80% 55%,
                rgba(147, 197, 253, 0.55),
                transparent 45%
              ),
              #f5faff;
          }

          .content {
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
          }

          .logo {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #1e3a8a;
          }

          .logo-icon {
            font-size: 34px;
            font-weight: bold;
          }

          .logo-text {
            font-size: 30px;
            font-weight: 600;
            color: rgba(30, 58, 138, 0.7);
          }

          .logo-dot {
            width: 8px;
            height: 8px;
            margin-top: 10px;
            border-radius: 50%;
            background: #1e3a8a;
          }

          .divider {
            display: flex;
            width: 100%;
            height: 20px;
            margin-top: 8px;
            border-top: 1px solid rgba(30, 58, 138, 0.5);
            border-bottom: 1px solid rgba(30, 58, 138, 0.5);
          }

          .divider-left {
            width: 33.333%;
            border-right: 1px solid rgba(30, 58, 138, 0.5);
          }

          .divider-right {
            flex: 1;
          }

          .title-wrapper {
            padding: 24px 0;
          }

          .title {
            margin: 0;
            color: #172554;
            font-size: 72px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 24px;
          }

          .awarded {
            display: flex;
            width: 100%;
            margin-top: 4px;
            border-top: 1px solid rgba(30, 58, 138, 0.5);
            border-bottom: 1px solid rgba(30, 58, 138, 0.5);
          }

          .awarded-text {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 58.333%;
            padding: 8px 0;
            border-right: 1px solid rgba(30, 58, 138, 0.5);
            color: #172554;
            font-size: 24px;
            font-weight: 500;
          }

          .arrows {
            display: flex;
            gap: 2px;
            font-size: 22px;
          }

          .empty {
            flex: 1;
          }

          .recipient {
            display: flex;
            border-left: 1px solid rgba(30, 58, 138, 0.5);
            border-bottom: 1px solid rgba(30, 58, 138, 0.5);
          }

          .badge-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20%;
            padding: 12px;
            border-right: 1px solid rgba(30, 58, 138, 0.5);
          }

          .badge {
            width: 64px;
            height: 64px;
            object-fit: contain;
          }

          .recipient-name {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            padding: 12px 24px;
          }

          .recipient-label {
            color: #475569;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 4px;
          }

          .name {
            margin: 4px 0 0;
            color: #172554;
            font-size: 38px;
            font-weight: 600;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          .description {
            margin: 0;
            padding: 8px 0;
            color: #172554;
            font-size: 18px;
            line-height: 1.5;
            text-transform: uppercase;
          }

          .footer {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-top: 24px;
          }

          .footer-item {
            color: #172554;
          }

          .footer-item.right {
            text-align: right;
          }

          .footer-value {
            margin: 0;
            font-size: 14px;
            font-weight: 500;
          }

          .footer-line {
            width: 128px;
            margin-top: 4px;
            border-top: 1px solid #172554;
          }

          .footer-item.right .footer-line {
            margin-left: auto;
          }

          .footer-label {
            margin: 4px 0 0;
            color: #475569;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
        </style>
      </head>

      <body>
        <div class="outer-certificate">
          <div class="inner-certificate">
            <div class="content">

              <div class="logo">
                <div class="logo-icon">◆</div>
                <div class="logo-text">
                  Skill<span>nest</span>
                </div>
                <div class="logo-dot"></div>
              </div>

              <div class="divider">
                <div class="divider-left"></div>
                <div class="divider-right"></div>
              </div>

              <div class="title-wrapper">
                <h1 class="title">Certificate</h1>
              </div>

              <div class="awarded">
                <div class="awarded-text">
                  IS AWARDED TO
                  <span class="arrows">↘ ↘ ↘</span>
                </div>
                <div class="empty"></div>
              </div>

              <div class="recipient">
                <div class="badge-wrapper">
                  <img
                    src="${badgePng}"
                    class="badge"
                    alt="Certificate badge"
                  />
                </div>

                <div class="recipient-name">
                  <span class="recipient-label">Recipient</span>
                  <h2 class="name">${studentName}</h2>
                </div>
              </div>

              <p class="description">
                for successfully completing the ${courseName}
              </p>

              <div class="divider">
                <div class="divider-left"></div>
                <div class="divider-right"></div>
              </div>

              <div class="footer">
                <div class="footer-item">
                  <p class="footer-value">${issueDate}</p>
                  <div class="footer-line"></div>
                  <p class="footer-label">Date</p>
                </div>

                <div class="footer-item right">
                  <p class="footer-value">SkillNest</p>
                  <div class="footer-line"></div>
                  <p class="footer-label">Authorized</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </body>
      </html>
    `

    await page.setContent(html, {
      waitUntil: 'networkidle0'
    })

    await page.pdf({
      path: 'certificate-test.pdf',
      width: '1000px',
      height: '550px',
      printBackground: true
    })

    console.log('Certificate PDF generated successfully')
  } finally {
    await browser.close()
  }
}