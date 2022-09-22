import React from 'react';
import { useEffect } from 'react';

function ImageViewerModal({ src, setImageUrl }) {
    let imageViewerRef = React.createRef();
    useEffect(() => {
        document.getElementsByTagName("body")[0].style.overflow="hidden";
    }, []);
    function hidePreview() {
        imageViewerRef.current.classList.toggle("hidden");
        setTimeout(() => {
            setImageUrl();
            document.getElementsByTagName("body")[0].style.overflow="auto";
        }, 100);
    }
    function hidePreviewOC(e) {
        let cX = e.clientX;
        let cY = e.clientY;
        let el = document.elementFromPoint(cX, cY);
        if(el.className === "image-viewer") {
            imageViewerRef.current.classList.toggle("hidden");
            setTimeout(() => {
                setImageUrl();
                document.getElementsByTagName("body")[0].style.overflow="auto";
            }, 100);
        }
    }
    return (
        <div>
            {
                <div ref={imageViewerRef} className="image-viewer" onClick={e => hidePreviewOC(e)}>
                    <button onClick={hidePreview}>
                        <div></div>
                        <div></div>
                    </button>
                    <img src={src} alt="preview"/>
                </div>
            }
        </div>
    )
}

export default ImageViewerModal;