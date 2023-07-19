import { LoaderColumn } from "./LoaderColumn"



export const Loader:React.FC = () =>{ 
    return <section className="loader">
        <LoaderColumn variant="reverse" galeryIndex={1} />
        <LoaderColumn galeryIndex={2}/>
        <LoaderColumn hasMain={true} variant="reverse" galeryIndex={3}/>
        <LoaderColumn galeryIndex={1} />
        <LoaderColumn galeryIndex={2} variant="reverse"/>
    </section>
}