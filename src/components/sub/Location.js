import {useEffect, useRef} from 'react';

export default function Location(){
    let main = useRef(null);
    const {kakao} = window;
    const container = useRef(null);

    useEffect(()=>{
        main.current.classList.add("on");
        
        const options = {
            center : new kakao.maps.LatLng(),
            level : 3
        }
        new kakao.map.Map(container.current,options);
  },[])

    return(
        <main className="content location" ref={main}>
           <figure></figure>
            <div className="inner">
                <h1>Location</h1>
                <section>
                    <div id="map" ref={container}>

                    </div>
                </section>
            </div>
        </main>
    );
}