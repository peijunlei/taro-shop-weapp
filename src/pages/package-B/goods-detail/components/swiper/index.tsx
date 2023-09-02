import { Swiper, SwiperItem, Image } from "@tarojs/components";
import useGoodsDetail from "../../useGoodsDetail";
import { shallow } from "zustand/shallow";




import './index.scss';

function GoodsSwiper() {
  const { images } = useGoodsDetail(state => ({
    images: state.images,
  }), shallow)
  return (
    <Swiper className='goods-detail-swiper'>
      {
        images.map((item, index) => (
          <SwiperItem key={index} >
            <Image
              className='swiper-img'
              src={item.artworkUrl}
            />
          </SwiperItem>
        ))
      }
    </Swiper>
  )

}
export default GoodsSwiper