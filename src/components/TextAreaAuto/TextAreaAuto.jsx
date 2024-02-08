import { useState, useRef, useLayoutEffect } from "react"

export const TextAreaAuto = () => {
  const textareaRef = useRef(null)
  const [value, setValue] = useState('')
  
  const onTAChange = (event) => setValue(event.target.value);
  const min_TA_height = 162;
  useLayoutEffect(() => {
    textareaRef.current.style.height = "inherit";
    textareaRef.current.style.height = `${Math.max(
    textareaRef.current.scrollHeight,
    min_TA_height
    )}px`;
  }, [value]);
  return (
    <>
    <textarea 
        onChange={onTAChange}
        ref={textareaRef}
        style={{
          minHeight: min_TA_height,
          resize: "none",
          backgroundColor: "transparent",
          color: 'white',
          fontSize: '18px',
          fontFamily: 'Gill Sans',
          padding: '10px',
          backgroundColor: 'rgb(65, 47, 61)',
          borderRadius: "10px"
        }}
        value={value}
      >
      </textarea>
    </>
  )
}