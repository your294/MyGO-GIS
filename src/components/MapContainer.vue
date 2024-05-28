<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useRouter } from "vue-router";

let map = null;
let myMarker = null;
let GD_MAP_API = null;
let initialMap = false;
let intervalId = null;

const pathData = [
  [120.351411, 30.315236],
  [120.351426, 30.315498],
  [120.351805, 30.315511],
  [120.352769, 30.315505],
  [120.35396, 30.315531],
  [120.354005, 30.314568],
];

const myPosition = ref({
  lng: 0,
  lat: 0,
});

var GPS = {
  PI: 3.141592653589793,
  x_pi: (3.141592653589793 * 3000.0) / 180.0,
  delta: function (lat, lon) {
    var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    var ee = 0.006693421622965943; //  ee: 椭球的偏心率。
    var dLat = this.transformLat(lon - 105.0, lat - 35.0);
    var dLon = this.transformLon(lon - 105.0, lat - 35.0);
    var radLat = (lat / 180.0) * this.PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * this.PI);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * this.PI);
    return {
      lat: dLat,
      lon: dLon,
    };
  },
  //WGS-84 to GCJ-02
  gcj_encrypt: function (wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon))
      return {
        lat: wgsLat,
        lon: wgsLon,
      };

    var d = this.delta(wgsLat, wgsLon);
    return {
      lat: wgsLat + d.lat,
      lon: wgsLon + d.lon,
    };
  },
  outOfChina: function (lat, lon) {
    if (lon < 72.004 || lon > 137.8347) return true;
    if (lat < 0.8293 || lat > 55.8271) return true;
    return false;
  },
  transformLat: function (x, y) {
    var ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin((y / 3.0) * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * this.PI) +
        320 * Math.sin((y * this.PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  },
  transformLon: function (x, y) {
    var ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * this.PI) +
        20.0 * Math.sin(2.0 * x * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin((x / 3.0) * this.PI)) *
        2.0) /
      3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * this.PI) +
        300.0 * Math.sin((x / 30.0) * this.PI)) *
        2.0) /
      3.0;
    return ret;
  },
};

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "d78bf5d9cd763ead5f428fabec1e0ca6",
  };

  // callback we list all Points which need to check
  const setMarker = () => {
    let center = map.getCenter();
    let radius = 10;
    let Marker = new AMap.CircleMarker({
      center: center, //圆心
      radius: radius, //半径
      strokeColor: "white", //轮廓线颜色
      strokeWeight: 2, //轮廓线宽度
      strokeOpacity: 0.5, //轮廓线透明度
      fillColor: "green", //多边形填充颜色
      fillOpacity: 0.5, //多边形填充透明度
      zIndex: 10, //多边形覆盖物的叠加顺序
      cursor: "pointer", //鼠标悬停时的鼠标样式
    });
    myMarker = Marker;
    map.add(Marker);
    map.setFitView([Marker]);
  };

  const setPointsMarker = () => {
    let radius = 10;
    for (let i = 0; i < PointList.value.length; i++) {
      let circleMarker = new AMap.CircleMarker({
        center: PointList.value[i], //圆心
        radius: radius, //半径
        strokeColor: "white", //轮廓线颜色
        strokeWeight: 2, //轮廓线宽度
        strokeOpacity: 0.5, //轮廓线透明度
        fillColor: "rgba(0,0,255,1)", //多边形填充颜色
        fillOpacity: 0.5, //多边形填充透明度
        zIndex: 10, //多边形覆盖物的叠加顺序
        cursor: "pointer", //鼠标悬停时的鼠标样式
      });
      map.add(circleMarker);
    }
  };

  // callback we draw the polyline for guard to follow
  const drawPolyLine = () => {
    let path = [];
    for (let d of pathData) {
      path.push(new AMap.LngLat(d[0], d[1]));
    }
    //创建 Polyline 实例
    let polyline = new AMap.Polyline({
      path: path,
      strokeWeight: 2, //线条宽度
      strokeColor: "blue", //线条颜色
      lineJoin: "round", //折线拐点连接处样式
    });
    map.add(polyline);
  };

  AMapLoader.load({
    key: "1442515ef2752a3ef48886e069d7c598", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      GD_MAP_API = AMap;
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "2D", // 是否为3D地图模式
        zoom: 16, // 初始化地图级别
        // center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
      map.plugin(["AMap.Geolocation"], function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          offset: [10, 20], // 定位按钮的停靠位置的偏移量
          needAddress: true, // 是否需要将定位结果进行逆地理编码操作
          noIpLocate: 3,
          zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          position: "RB", //  定位按钮的排放位置,  RB表示右下
        });

        function getCurrentPos() {
          geolocation.getCurrentPosition(function (status, result) {
            if (status == "complete") {
              onComplete(result);
            } else {
              onError(result);
            }
          });
        }

        intervalId = setInterval(getCurrentPos, 10000);

        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位：", data.formattedAddress);
          let gps = GPS.gcj_encrypt(
            data.position.getLat(),
            data.position.getLng()
          );
          map.setCenter(new AMap.LngLat(gps.lon, gps.lat), true);
          myPosition.value = data.position;
          if (initialMap === false) {
            drawPolyLine();
            setPointsMarker();
          }
          setMarker();
          if (initialMap === false) initialMap = true;
        }

        function onError(data) {
          // 定位出错
          console.error("定位失败!: ", data);
        }
      });
      map.on("click", function (e) {
        document.getElementById("lnglat").value =
          e.lnglat.getLng() + "," + e.lnglat.getLat();
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
  clearInterval(intervalId);
});

const router = useRouter();

const checkPoints = ref([
  {
    lng: [120.354517, 30.315094],
    check: false,
  },
  {
    lng: [120.359547, 30.316876],
    check: false,
  },
  {
    lng: [120.361117, 30.316489],
    check: false,
  },
  {
    lng: [120.360525, 30.31347],
    check: false,
  },
]);

const showPointList = ref(false);

const PointList = ref([
  [120.354517, 30.315094],
  [120.359547, 30.316876],
  [120.361117, 30.316489],
  [120.360525, 30.31347],
]);

const onClickPlus = () => {
  let cur = [myPosition.value.lng, myPosition.value.lat];
  let idx = 0,
    min_d = 100000000,
    check = -1;
  for (let p of PointList.value) {
    let dis = GD_MAP_API.GeometryUtil.distance(cur, p);
    min_d = Math.min(dis, min_d);
    if (dis < min_d && dis < 1000000) check = idx;
    idx += 1;
  }
  console.log(check);
  if (check !== -1) {
    checkPoints.value[idx].check = true;
  }

  showToast({
    message: "GIS 打卡正在处理",
    icon: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
  });

  setTimeout(() => {
    router.push("/camera");
  }, 2000);
};

const onClickShow = () => {
  showPointList.value = !showPointList.value;
};
</script>

<template>
  <div id="container"></div>
  <van-floating-bubble
    class="z-20"
    :offset="{ x: 200, y: 600 }"
    axis="xy"
    icon="plus"
    @click="onClickPlus"
    >打卡</van-floating-bubble
  >
  <van-button
    class="absolute right-0 top-12 z-20"
    type="primary"
    @click="onClickShow"
    >巡检地点</van-button
  >
  <!-- 展示需要巡检的地点 -->
  <div v-if="showPointList === true">
    <van-cell-group class="point-list">
      <van-cell
        :key="idx"
        v-for="(obj, idx) in checkPoints"
        :title="`Pos` + idx"
        icon="location-o"
        :value="obj.lng[0] + ', ' + obj.lng[1]"
      >
        <template #title>
          <div class="inline-flex justify-center">
            <van-checkbox v-model="obj.check"></van-checkbox>
            <span>{{ "Pos" + idx }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>

  <div class="input-card">
    <h4>左击获取经纬度：</h4>
    <div class="input-item">
      <input type="text" readonly="true" id="lnglat" />
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 100%;
  height: calc(100vh - var(--nav-bar-height) - var(--tab-bar-height) - 5px);
  z-index: 10;
}

.input-card {
  @apply absolute bottom-16 left-0 p-2 rounded-md shadow-md bg-white z-20;
  width: auto;
}

.input-item {
  @apply border-solid border-gray-500 border-2 z-20;
  width: 200px;
}

.point-list {
  position: absolute;
  top: 80px;
  right: 0;
  z-index: 20;
}
</style>
