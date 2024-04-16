import { memo } from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";


interface SliderImagesProps {
}
import './index.scss';
import Taro from "@tarojs/taro";
import useGoodsDetails from "../../useStore";

const defaultImg = 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/pandora-ui/assets/components/images/image-slider/icon-no-img.png'
function SliderImages(props: SliderImagesProps) {
  /* console.log('images', images); */
  const images = useGoodsDetails((state) => state.images);
  let data = images.length === 0 ? [defaultImg] : images;
  return (
    <View className='slider_images'>
      <Swiper className='sw' indicatorDots={false}>
        {
          data.map((item, index) => {
            return (
              <SwiperItem key={index} className='slider_images_item'>
                <Image src={item} className='img' mode='aspectFill' lazyLoad onClick={() => {
                  Taro.previewImage({
                    current: item, // 当前显示图片的http链接
                    urls: images // 需要预览的图片http链接列表
                  })
                }}
                />
              </SwiperItem>
            );
          })
        }
      </Swiper>
    </View>
  );
}

export default memo(SliderImages);