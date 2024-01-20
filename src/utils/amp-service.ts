import Taro from "@tarojs/taro";

/**
 * 高德定位
 * @returns 
 */
export function getGaodeLocation() {
  return new Promise<ILocation>((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认：true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大

      })
      geolocation.getCurrentPosition(function (status, result) {
        console.log('高德定位信息', result);
        if (status == 'complete') {
          resolve({ lng: result.position.lng, lat: result.position.lat })
        } else {
          reject(result)
        }
      });
    })

  })

}

/**
 * 浏览器定位
 * @returns 
 */
export function getLocationBrowser() {
  return new Promise<ILocation>((resolve, reject) => {
    function geoShowPosition(position) {
      if (position) {
        console.log('浏览器定位信息', position.coords);
        const data = { lng: position.coords.longitude, lat: position.coords.latitude };
        resolve(data);
      } else {
        reject()
      }
    }

    function geoShowError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          // 用户拒绝授权
          alert("我们需要您的位置权限来提供更好的服务，请允许使用地理位置信息。");
          break;
        case error.POSITION_UNAVAILABLE:
          // 位置信息不可用
          alert("无法获取您的位置信息，请检查设备设置。");
          break;
        case error.TIMEOUT:
          // 请求超时
          alert("请求地理位置信息超时，请重试。");
          break;
        case error.UNKNOWN_ERROR:
          // 未知错误
          alert("发生未知错误，无法获取您的位置。");
          break;
      }
      reject(error);
    }

    navigator.geolocation.getCurrentPosition(geoShowPosition, geoShowError);
  });


}

interface IGeocoderRes {
  formattedAddress: string,
  cityName: string,
  cityCode: string,
}
/**
 * 逆地理编码
 * @param params 
 * @returns 
 */
export function Geocoder(params: ILocation) {
  return new Promise<IGeocoderRes>((resolve, reject) => {
    AMap.plugin('AMap.Geocoder', function () {
      let geocoder = new AMap.Geocoder()
      const lnglat = [params.lng, params.lat]
      geocoder.getAddress(lnglat, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          resolve({
            formattedAddress: result.regeocode.formattedAddress,
            cityName: result.regeocode.addressComponent.city,
            cityCode: result.regeocode.addressComponent.adcode.slice(0, 4) + "00",
          })
        } else {
          reject()
        }
      })
    })
  });

}

interface PlaceSearchParams {
  lnglat: ILocation;
  keyword?: string;
}
export function PlaceSearch(params: PlaceSearchParams) {
  const { keyword, lnglat } = params;
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.PlaceSearch", function () {
      let placeSearch = new AMap.PlaceSearch({
        pageSize: 20,
      });
      let cpoint = [lnglat.lng, lnglat.lat]; //中心点坐标
      placeSearch.searchNearBy(keyword, cpoint, 1000, function (status, result) {
        //查询成功时，result 即对应匹配的 POI 信息
        if (status === "complete" && result.info === "OK") {
          resolve(result.poiList.pois)
        } else {
          resolve([])
        }
      });
    });
  })
}
interface CityInfo {
  cityName: string;
  cityCode: string;
}
export function CitySearch() {
  return new Promise<CityInfo>((resolve, reject) => {
    AMap.plugin('AMap.CitySearch', function () {
      const citySearch = new AMap.CitySearch()
      citySearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          console.log('当前城市信息', result)
          resolve({ cityName: result.city || result.province, cityCode: result.adcode })
        } else {
          reject()
        }
      })
    })
  })
}



export function getAroundList(params: ILocation) {
  return new Promise<any[]>((resolve, reject) => {
    const lnglat = `${params.lng.toFixed(6)},${params.lat.toFixed(6)}`
    Taro.request({
      url: 'https://restapi.amap.com/v5/place/around',
      data: {
        key: '2ec3645821da5b5b988e8943267abdba',
        types: '餐饮服务|购物服务|生活服务|公司企业|商务住宅|公共设施',
        location: lnglat,
        page_size: 25
      },
      success: (res: any) => {
        const data = res.data
        if (data.status === '1' && data.info === 'OK') {
          resolve(data.pois)
        } else {
          reject()
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
export function getRegeo(params: ILocation) {
  return new Promise<IGeocoderRes>((resolve, reject) => {
    const lnglat = `${params.lng.toFixed(6)},${params.lat.toFixed(6)}`
    Taro.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        key: '2ec3645821da5b5b988e8943267abdba',
        location: lnglat,
      },
      success: (res: any) => {
        const data = res.data
        if (data.status === '1' && data.info === 'OK') {
          resolve({
            formattedAddress: data.regeocode.formatted_address,
            cityName: data.regeocode.addressComponent.city,
            cityCode: data.regeocode.addressComponent.adcode.slice(0, 4) + "00",
          })
        } else {
          reject()
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
