import { useSelector } from "react-redux";


const Footer = () => {
    const theme = useSelector(state => state.ui.theme)

    return(
        <footer style={{
            padding: "20px",
            background: theme === 'light'? "#eee": "#333",
            color: theme === 'light' ? "#000": "#fff",
            marginTop: '40px'
        }}>

            <p>2026 Мой сайт на REDUX</p>

        </footer>
    )
}

export default Footer