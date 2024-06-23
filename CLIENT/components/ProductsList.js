import { useProducts } from "@/lib/hooks"

export default ({userData}) => {
    const [productsList, loading] = useProducts();
    return (
        <div>

        </div>
    )
}