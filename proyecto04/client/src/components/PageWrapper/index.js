import Header from "../Header";

function PageWrapper({ children }) {
    return (<>
        <Header />
        {children}
    </>
    )
}

export default PageWrapper