import React, { useEffect } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'

import bgSvg from '../components/bg-pattern.svg'
import FaqBg from './FaqBg'

const Faq = (props) => {
  useEffect(() => {
    props.changeBackgroundColorLight()
  }, [])

  return (
    <>
      <div style={{ backgroundImage: `url(${bgSvg})` }} className="bgSvg">
        <FaqBg />
      </div>
      <div className="container">
        <div className="py-4">
          <h2 className="grass text-center fs-32 mb-3">常見問題Q&A</h2>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  Q1：如何註冊為會員?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  請點選右上角的「登入|註冊」或人形圖示（若您用手機瀏覽），再點選「註冊帳號」並依畫面指示填寫資料，最後到您註冊的Email信箱中收取確認信即可。
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                  Q2：Mano提供那些付款方式?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  我們提供以下付費方式：
                  「信用卡」、「ATM轉帳」、「貨到付款」、「7-11
                  ibon付款」、「超商取貨付款」；另針對行動裝置提供四種行動支付：「Apple
                  Pay」、「Google Pay」、「LINE Pay」、「Samsung
                  Pay」。目前尚無臨櫃匯款、支票和現金等方式。
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  Q3：訂購商品需要先加入會員嗎?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  貴站希望能全心服務每一位客人，包含訂購如有問題或是流程等等皆可以順利服務到您，所以要麻煩先加入會員喔，謝謝。
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  Q4：如何報名加入社群課程?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  請將您喜歡的課程選擇好日期時段，並加入購物車完成結帳流程，即可報名您喜歡的各類課程哦~
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  Q5：今天訂購的商品可以明天到貨嗎? 我急著使用!
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  本站的出貨時間為，下單後起計算3個工作日，若您有急需使用的商品，建議您提前1-2天訂購較妥，以免忙中有誤，造成您的不便請見諒。
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  Q6：如何追蹤我喜歡的商品或課程?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  如需追蹤商品(課程)，須先加入會員。
                  在商品或課程列表的右上方會有追蹤此商品(課程)的按鈕，點擊後會提示該商品(課程)已完成追蹤。
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </>
  )
}

export default Faq
