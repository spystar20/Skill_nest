import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import os from 'os'

export const getCertificatePdf = async ({
  studentName,
  courseName,
  issueDate
}) => {
  const browser = await puppeteer.launch({ headless: true })

  try {
    const page = await browser.newPage()

    const badgePath = path.resolve('../Frontend/src/assets/badge.png')
    const certificatePath = path.resolve(
      '../Frontend/src/assets/certificate.png'
    )

    const badgePng = `data:image/png;base64,${fs
      .readFileSync(badgePath)
      .toString('base64')}`

    const certificatePng = `data:image/png;base64,${fs
      .readFileSync(certificatePath)
      .toString('base64')}`

    const backgroundUrl =
      'https://i.pinimg.com/1200x/30/20/9d/30209d19e0415c95e5683885d490aaaf.jpg'

    const html = `
      <!DOCTYPE html>

      <html>

      <head>

        <meta charset="UTF-8" />

        <style>

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }

          body {
            display: flex;
            align-items: center;
            justify-content: center;

            font-family: Arial, sans-serif;

            background: white;
          }


          /* =========================
             OUTER CERTIFICATE
          ========================= */

          .outer-certificate {
            position: relative;

            width: 1000px;
            height: 550px;

            padding: 12px;

            background-image: url("${backgroundUrl}");
            background-position: top;
            background-size: cover;
            background-repeat: no-repeat;

            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
          }


          /* =========================
             CERTIFICATE DECORATION
          ========================= */

          .certificate-decoration {
            position: absolute;

            right: -90px;
            top: 0;

            z-index: 20;

            width: 192px;
          }


          /* =========================
             INNER CERTIFICATE
          ========================= */

          .inner-certificate {
            position: relative;

            width: 100%;
            height: 100%;

            overflow: hidden;
            padding: 24px;

          }


          .content {
            position: relative;

            z-index: 10;

            width: 100%;
            height: 100%;
          }


          /* =========================
             LOGO
          ========================= */

          .logo {
            display: flex;

            align-items: center;

            gap: 8px;
          }


          .logo-text {
            display: flex;

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


          /* =========================
             DIVIDER
          ========================= */

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


          /* =========================
             TITLE
          ========================= */

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


          /* =========================
             AWARDED TO
          ========================= */

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


          /* =========================
             RECIPIENT
          ========================= */

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


          /* =========================
             COURSE DESCRIPTION
          ========================= */

          .description {
            margin: 0;

            padding: 8px 0;

            color: #172554;

            font-size: 18px;

            font-weight: 400;

            line-height: 1.5;

            text-transform: uppercase;
          }


          /* =========================
             FOOTER
          ========================= */

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


          <!-- CERTIFICATE DECORATION -->

          <img
            src="${certificatePng}"
            class="certificate-decoration"
            alt="Certificate decoration"
          />


          <div class="inner-certificate">

            <div class="content">


              <!-- LOGO -->

              <div class="logo">

                <div class="logo-text">
                  Skill<span>nest</span>
                </div>

                <div class="logo-dot"></div>

              </div>


              <!-- TOP DIVIDER -->

              <div class="divider">

                <div class="divider-left"></div>

                <div class="divider-right"></div>

              </div>


              <!-- CERTIFICATE TITLE -->

              <div class="title-wrapper">

                <h1 class="title">
                  Certificate
                </h1>

              </div>


              <!-- AWARDED TO -->

              <div class="awarded">

                <div class="awarded-text">

                  IS AWARDED TO

                  <span class="arrows">
                    ↘ ↘ ↘
                  </span>

                </div>

                <div class="empty"></div>

              </div>


              <!-- RECIPIENT -->

              <div class="recipient">


                <!-- BADGE -->

                <div class="badge-wrapper">

                  <img
                    src="${badgePng}"
                    class="badge"
                    alt="Certificate badge"
                  />

                </div>


                <!-- NAME -->

                <div class="recipient-name">

                  <span class="recipient-label">
                    Recipient
                  </span>

                  <h2 class="name">
                    ${studentName}
                  </h2>

                </div>

              </div>


              <!-- COURSE DESCRIPTION -->

              <p class="description">
                for successfully completing the ${courseName}
              </p>


              <!-- BOTTOM DIVIDER -->

              <div class="divider">

                <div class="divider-left"></div>

                <div class="divider-right"></div>

              </div>


              <!-- FOOTER -->

              <div class="footer">


                <div class="footer-item">

                  <p class="footer-value">
                    ${issueDate}
                  </p>

                  <div class="footer-line"></div>

                  <p class="footer-label">
                    Date
                  </p>

                </div>


                <div class="footer-item right">

                  <p class="footer-value">
                    SkillNest
                  </p>

                  <div class="footer-line"></div>

                  <p class="footer-label">
                    Authorized
                  </p>

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


    /*
      Wait for all images to finish loading.
    */

    await page.evaluate(async () => {

      const images = Array.from(document.images)

      await Promise.all(
        images.map((img) => {

          if (img.complete) {
            return Promise.resolve()
          }

          return new Promise((resolve) => {

            img.onload = resolve

            img.onerror = resolve

          })

        })
      )

    })


    /*
      Create temporary PDF file.
    */

    const fileName = `certificate-${Date.now()}.pdf`

    const pdfPath = path.join(
      os.tmpdir(),
      fileName
    )


    await page.pdf({

      path: pdfPath,

      width: '1000px',

      height: '550px',

      printBackground: true,

      pageRanges: '1'

    })

    return pdfPath


  } finally {

    await browser.close()

  }
}