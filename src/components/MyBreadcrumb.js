import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function MyBreadcrumb(props) {
  const pathlist = [
    '/',
    '/mall/shop',
    '/mall/shop/cuisine',
    '/mall/shop/cuisine/food',
    '/mall/shop/cuisine/drinks',
    '/mall/shop/clothes',
    '/mall/shop/clothes/man',
    '/mall/shop/clothes/man/top',
    '/mall/shop/clothes/man/bottom',
    '/mall/shop/clothes/man/accessory',
    '/mall/shop/clothes/woman',
    '/mall/shop/clothes/woman/top',
    '/mall/shop/clothes/woman/bottom',
    '/mall/shop/clothes/woman/accessory',
    '/mall/shop/goods',
    '/mall/shop/goods/beauty',
    '/mall/shop/goods/beauty/makeup',
    '/mall/shop/goods/beauty/body',
    '/mall/shop/goods/beauty/fingernail',
    '/mall/shop/goods/beauty/hair',
    '/mall/shop/goods/outdoor',
    '/mall/shop/goods/house',
    '/mall/shop/goods/house/furniture',
    '/mall/shop/goods/house/others',
    '/mall/shop/delivery-free',
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
  let locationPathname = `/mall/shop/${props.match.params.second}`
  let secondPathname = `/mall/shop/${props.match.params.second}/${props.match.params.third}`
  let thirdPathname = `/mall/shop/${props.match.params.second}/${props.match.params.third}/${props.match.params.fourth}`
  let fourthPathname = `/mall/shop/${props.match.params.second}/${props.match.params.third}/${props.match.params.fourth}/${props.match.params.fifth}`
  let fifthPathname = `/mall/shop/${props.match.params.second}/${props.match.params.third}/${props.match.params.fourth}/${props.match.params.fifth}/${props.match.params.sixth}`

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
  let catUrl = `/mall/shop/${props.match.params.third}?${props.match.params.fifth}`
  let catUrl2 = `/mall/shop/${props.match.params.second}?categoryId=${catId}`
  let catUrl3 = `/mall/shop/${props.match.params.second}/${props.match.params.third}?categoryId=${catId1}`

  //productList/shop/cuisine?categoryId=3

  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes('/category=1')) locationPathname = '/mall/shop'

  if (locationPathname.includes('/food')) locationPathname = '/food'
  if (locationPathname.includes('/drinks')) locationPathname = '/drinks'

  // console.log(`second: ${secondPathname}`)
  // console.log(`third: ${thirdPathname}`)
  // console.log(`four: ${fourthPathname}`)
  console.log(locationPathname)
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
          所有商品
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
          {pathnames[index]}
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
          <a href={catUrl2}>{pathnames[secondIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href={catUrl3}>{pathnames[thirdIndex]}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pathnames[fourthIndex]}
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

  if (!props.match.params.third) display = two
  if (!props.match.params.second) display = allcourse

  return (
    <>
      <nav aria-label="breadcrumb">{display}</nav>
    </>
  )
}

export default withRouter(MyBreadcrumb)