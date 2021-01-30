import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function DetailBreadcrumb(props) {
  const pathlist = [
    '/',
    '/mall/itemDetail/shop',
    '/mall/itemDetail/shop/cuisine',
    '/mall/itemDetail/shop/cuisine/food',
    '/mall/itemDetail/shop/cuisine/drinks',
    '/mall/itemDetail/shop/clothes',
    '/mall/itemDetail/shop/clothes/man',
    '/mall/itemDetail/shop/clothes/man/top',
    '/mall/itemDetail/shop/clothes/man/bottom',
    '/mall/itemDetail/shop/clothes/man/accessory',
    '/mall/itemDetail/shop/clothes/woman',
    '/mall/itemDetail/shop/clothes/woman/top',
    '/mall/itemDetail/shop/clothes/woman/bottom',
    '/mall/itemDetail/shop/clothes/woman/accessory',
    '/mall/itemDetail/shop/goods',
    '/mall/itemDetail/shop/goods/beauty',
    '/mall/itemDetail/shop/goods/beauty/makeup',
    '/mall/itemDetail/shop/goods/beauty/body',
    '/mall/itemDetail/shop/goods/beauty/fingernail',
    '/mall/itemDetail/shop/goods/beauty/hair',
    '/mall/itemDetail/shop/goods/outdoor',
    '/mall/itemDetail/shop/goods/house',
    '/mall/itemDetail/shop/goods/house/furniture',
    '/mall/itemDetail/shop/goods/house/others',
    '/mall/itemDetail/shop/delivery-free',
  ]
  const pathnames = [
    '首頁',
    '所有商品',
    '抹の食',
    '食品',
    '飲品',
    '抹の著',
    '男性',
    '上著',
    '下著',
    '飾品',
    '女性',
    '上著',
    '下著',
    '飾品',
    '抹の物',
    '美妝護膚',
    '彩妝品',
    '身體清潔',
    '指彩',
    '髮妝',
    '戶外用品',
    '家庭用品',
    '家具',
    '雜物',
    '免運專區',
  ]

  console.log(props)
  // 先找出對應的中文詞
  let locationPathname = `/mall/itemDetail/shop/${props.match.params.third}`
  let secondPathname = `/mall/itemDetail/shop/${props.match.params.third}/${props.match.params.fourth}`
  let thirdPathname = `/mall/itemDetail/shop/${props.match.params.third}/${props.match.params.fourth}/${props.match.params.fifth}`
  let fourthPathname = `/mall/itemDetail/shop/${props.match.params.third}/${props.match.params.fourth}/${props.match.params.fifth}/${props.match.params.sixth}`
  let fifthPathname = `/mall/itemDetail/shop/${props.match.params.third}/${props.match.params.fourth}/${props.match.params.fifth}/${props.match.params.sixth}/${props.match.params.sth}`

  let catId, catId1

  if (locationPathname.includes('/clothes')) catId = '4'
  if (locationPathname.includes('/cuisine')) catId = '3'
  if (locationPathname.includes('/goods')) catId = '5'
  if (fifthPathname.includes('/man')) catId1 = '8'
  if (fifthPathname.includes('/woman')) catId1 = '9'

  if (fifthPathname.includes('/beauty')) catId1 = '16'
  if (fifthPathname.includes('/outdoor')) catId1 = '17'
  if (fifthPathname.includes('/house')) catId1 = '18'
  if (fifthPathname.includes('/makeup')) catId1 = '19'
  if (fifthPathname.includes('/body')) catId1 = '20'
  if (fifthPathname.includes('/fingernail')) catId1 = '21'
  if (fifthPathname.includes('/hair')) catId1 = '22'
  if (fifthPathname.includes('/furniture')) catId1 = '23'
  if (fifthPathname.includes('/others')) catId1 = '24'
  if (locationPathname.includes('/delivery-free')) catId = '25'

  //productList/shop/cuisine?categoryId=3
  //let catUrl = `/mall/shop/${props.match.params.third}?${props.match.params.fifth}`

  let catUrl2 = `/mall/shop/${props.match.params.third}?categoryId=${catId}`
  let catUrl3 = `/mall/shop/${props.match.params.third}/${props.match.params.fourth}?categoryId=${catId1}`

  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes('/parentId=0')) locationPathname = '/mall/shop'

  if (locationPathname.includes('/food')) locationPathname = '/food'
  if (locationPathname.includes('/drinks')) locationPathname = '/drinks'

  // console.log(`second: ${secondPathname}`)
  // console.log(`third: ${thirdPathname}`)
  // console.log(`four: ${fourthPathname}`)
  console.log(catUrl2)
  // if (locationPathname.includes('/clothes')) locationPathname = '/clothes'

  // if (locationPathname.includes('/goods')) locationPathname = '/goods'

  // if (locationPathname.includes('/delivery-free'))
  //   locationPathname = '/delivery-free'

  const index = pathlist.findIndex((v) => v === locationPathname)
  const secondIndex = pathlist.findIndex((v) => v === secondPathname)
  const thirdIndex = pathlist.findIndex((v) => v === thirdPathname)
  const fourthIndex = pathlist.findIndex((v) => v === fourthPathname)
  const fifthIndex = pathlist.findIndex((v) => v === fifthPathname)

  const allcourse = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[index]}
        </li>
      </ol>
    </>
  )

  const two = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/mall/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[secondIndex]}
        </li>
      </ol>
    </>
  )

  const third = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/mall/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl2}>{pathnames[index]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[secondIndex]}
        </li>
      </ol>
    </>
  )

  const fourth = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/mall/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl2}>{pathnames[index]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl3}> {pathnames[secondIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[thirdIndex]}
        </li>
      </ol>
    </>
  )
  const fifth = (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">首頁</Link>
        </li>
        <li className="breadcrumb-item">
          <a href="/mall/shop">所有商品</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl2}>{pathnames[index]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl3}>{pathnames[secondIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[thirdIndex] ? pathnames[thirdIndex] : '商品內容'}
        </li>
        {/* <li className="breadcrumb-item active" aria-current="page">
          商品內容
        </li>  */}
      </ol>
    </>
  )

  let display

  if (props.match.params.fifth) display = fifth

  // if (props.match.params.fifth == 'categoryId=6') display = fourth

  if (!props.match.params.seventh) display = fifth

  if (!props.match.params.fifth) display = fourth

  if (!props.match.params.fourth) display = third

  if (!props.match.params.third) display = allcourse
  if (props.match.params.third == 'parentId=0') display = allcourse

  return (
    <>
      <nav aria-label="breadcrumb">{display}</nav>
    </>
  )
}

export default withRouter(DetailBreadcrumb)