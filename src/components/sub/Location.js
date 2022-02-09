import {useEffect, useRef,useState} from 'react';

export default function Location(){
    let main = useRef(null);
    const {kakao} = window;
    const container = useRef(null);
    const [map, setMap] = useState([]); // 정보값을 받는 중요한 데이터는 반드시 useState에 담아준다.
    // 변수값과 state의 값은 서로 다르기 때문에 이름이 같아도 상관없음
    const [index, setIndex] = useState(0);
    const path = process.env.PUBLIC_URL;

    const info =[
        {
            title:"본점",
            latlng : new kakao.maps.LatLng(37.48544680034892, 126.90113363256869),
            imgSrc : path + '/img/marker1.png',
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset : new kakao.maps.Point(116,99)},
        },
        {
            title:"독산지점",
            latlng : new kakao.maps.LatLng(37.4660917,126.9003506,14),
            imgSrc : path + '/img/marker2.png',
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset : new kakao.maps.Point(116,99)},
        },
        {
            title:"구로지점",
            latlng : new kakao.maps.LatLng(37.5031826,126.879848,17),
            imgSrc : path + '/img/marker3.png',
            imgSize : new kakao.maps.Size(232,99),
            imgPos : {offset : new kakao.maps.Point(116,99)},
        }
    ];

    const [mapInfo, setMapInfo] = useState(info);

    // 처음 컴포넌트 생성 시 한번만 실행
    useEffect(()=>{
        main.current.classList.add("on");
        
        const options = {
            center : new kakao.maps.LatLng(37.48544680034892, 126.90113363256869),
            level : 3,
            title : mapInfo[0].title,
        }
        // 카카오 api를 통해 리턴한 인스턴스를 state map에 옮겨담음
        const map = new kakao.maps.Map(container.current,options);
        setMap(map); 

        // 마커출력 인스턴스 생성 시 미리 state에 저장해놓은 mapInfo 배열의 정보값을 옵션으로 전달
        new kakao.maps.Marker({
            map : map,
            position: mapInfo[0].latlng,
            title : mapInfo[0].title,
            image : new kakao.maps.MarkerImage(mapInfo[0].imgSrc, mapInfo[0].imgSize, mapInfo[0].imgPos)
        })
        
  },[]);

  // index state 값이 변경될 때마다 실행
  useEffect(()=>{

  },[index]);

  // 리액트는 a태그가 아닌 버튼 태그로 만든다!
    return(
        <main className="content location" ref={main}>
           <figure></figure>
            <div className="inner">
                <h1>Location</h1>
                <section>
                    <div id="map" ref={container}>
                    </div>
                    <nav className = "traffic">
                        <button onClick={()=>{
                                map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                            }}>교통정보 보기</button>
                            <button onClick={()=>{
                                map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);                           
                            }}>교통정보 끄기</button>
                    </nav>
                    <nav className="branch">
                        <button onClick={()=>{
                            map.setCenter(mapInfo[0].latlng);
                        }}>본점</button>
                        <button onClick={()=>{
                            map.setCenter(mapInfo[1].latlng);
                        }}>지점1</button>
                        <button onClick={()=>{
                            map.setCenter(mapInfo[2].latlng);
                        }}>지점2</button>
                    </nav>
                </section>
            </div>
        </main>
    );
}