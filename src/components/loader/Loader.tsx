import { LoaderColumn } from "./LoaderColumn"

export interface Loader{
    galery:HTMLDivElement|null
} 


export const Loader:React.FC<Loader> = ({}) =>{ 
    return <section className="loader">
        <LoaderColumn variant="reverse" galeryIndex={1} />
        <LoaderColumn galeryIndex={2}/>
        <LoaderColumn hasMain={true} variant="reverse" galeryIndex={3}/>
        <LoaderColumn galeryIndex={1} />
        <LoaderColumn galeryIndex={2} variant="reverse"/>
    </section>
}