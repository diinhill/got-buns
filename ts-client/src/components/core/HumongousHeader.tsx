import React from 'react'
// reactstrap components
import { Container } from 'reactstrap'

// core components
interface Props {
  backgroundImage: string
  avatar: string
  title: string
  category: string
  qty: number | string
  qtyName: string
}

function HumongousHeader(props: Props) {

  console.log(`props`, props)
  const { backgroundImage, avatar, title, category = "", qty, qtyName } = props

  let pageHeader: any = React.createRef()
  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3
        pageHeader.current.style.transform = 'translate3d(0,' + windowScrollTop + 'px,0)' || 0
      }
      window.addEventListener('scroll', updateScroll)
      return function cleanup() {
        window.removeEventListener('scroll', updateScroll)
      }
    }
  })

  return (
    <div
      className='page-header clear-filter page-header-small'
      filter-color='blue'
    >
      <div
        className='page-header-image'
        style={{
          backgroundImage:
            'url(' + backgroundImage + ')',
        }}
        ref={pageHeader}
      ></div>
      <Container>
        <div className='photo-container'>
          {avatar && <img src={avatar} alt='' />}
        </div>
        <h3 className="title">{title}</h3>
        <p className="category">{category}</p>
        <div className="content">
          <div className="social-description">
            <h2>{qty}</h2>
            {qtyName}
          </div>
          {/* <div className="social-description">
              <h2>26</h2>
              <p>Comments</p>
            </div>
            <div className="social-description">
              <h2>48</h2>
              <p>Bookmarks</p>
            </div> */}
        </div>
      </Container>
    </div>
  )
}
export default HumongousHeader
