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


/**
 * 逆地理编码
 * @param params 
 * @returns 
 */
export function Geocoder(params: ILocation) {
  return new Promise<{
    formattedAddress: string,
    cityName: string,
    cityCode: string,
  }>((resolve, reject) => {
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
        pageSize:20,
      });
      let cpoint = [lnglat.lng, lnglat.lat]; //中心点坐标
      placeSearch.searchNearBy(keyword, cpoint, 1000, function (status, result) {
        //查询成功时，result 即对应匹配的 POI 信息
        if (status === "complete" && result.info === "OK") {
          resolve(result.poiList.pois)
        }else{
          resolve([])
        }
      });
    });
  })
}