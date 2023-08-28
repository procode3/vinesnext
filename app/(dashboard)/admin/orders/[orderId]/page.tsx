export default function Page({ params }: { params: { orderId: string } }) {

    return (
        <>
            <div className="flex content-between">
                <p>{`[Available]`}</p>
                <p>Order ID: {params.orderId}</p>
                <p>Total: Pages*cpp</p>
            </div>
            <div className="flex"></div>
        </>

    )
}