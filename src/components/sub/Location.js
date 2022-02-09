import {useEffect, useRef,useState} from 'react';

export default function Location(){
    let main = useRef(null);
    const {kakao} = window;
    const container = useRef(null);
    const [map, setMap] = useState([]); // 정보값을 받는 중요한 데이터는 반드시 useState에 담아준다.
    // 변수값과 state의 값은 서로 다르기 때문에 이름이 같아도 상관없음
    useEffect(()=>{
        main.current.classList.add("on");
        
        const options = {
            center : new kakao.maps.LatLng(37.4852192,126.8994053),
            level : 3
        }
        // 카카오 api를 통해 리턴한 인스턴스를 state map에 옮겨담음
        const map = new kakao.maps.Map(container.current,options);
        setMap(map); 
  },[]);
  // 리액트는 a태그가 아닌 버튼 태그로 만든다!
    return(
        <main className="content location" ref={main}>
           <figure></figure>
            <div className="inner">
                <h1>Location</h1>
                <section>
                    <div id="map" ref={container}>
                    </div>
                    <button onClick={()=>{
                            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                        }}>교통정보 보기</button>
                        <button onClick={()=>{
                            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);                           
                        }}>교통정보 끄기</button>
                </section>
            </div>
        </main>
    );
}