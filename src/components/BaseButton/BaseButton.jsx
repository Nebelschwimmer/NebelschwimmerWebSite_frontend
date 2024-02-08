import './baseButton.scss'
export const BaseButton = ({children}) => {
  return (
    <>
    <button className="base_btn">
    {children}
    </button>
    </>
  )
}