require('dotenv').config();

const HOST = process.env.HOST || 'DESKTOP-QQAQH05';

const httpGetWriters = async (session: any) => {
    try {
        const res = await fetch(
            `http://${HOST}:5000/api/users?populate=*&filters[role][name][$in]=Writer`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'Bearer ' + session!.user.jwt
            },
            next: { revalidate: 3600 },

        });

        if (res.status == 200) {
            const data = await res.json()
            return data;
        }

        return [];
    }
    catch (err) {
        console.error(err)
    }
}

async function httpGetClients(session: any) {
    try {

        const res = await fetch(
            `http://${HOST}:5000/api/users?populate=*&filters[role][name][$in]=Client`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'Bearer ' + session!.user.jwt
            }
        });

        return res.status == 200 ? await res.json() : [];
    }
    catch (err) {
        console.error(err)
    }
}

async function httpGetOrders(session: any) {
    try {
        const res = await fetch(
            `http://${HOST}:5000/api/orders?populate=*&filters[status][$in]=New&sort[0]=createdAt:desc`)
        return res.status == 200 ? await res.json() : [];
    }
    catch (err) {
        console.error(err)
    }
}

const httpGetOrder = async (id: string) => {
    try {
        const res = await fetch(
            `http://${HOST}:5000/api/orders/${id}?populate=*&filters[status][$in]=New&sort[0]=createdAt:desc`)
        return res.status == 200 ? await res.json() : {};
    }
    catch (err) {
        console.error(err)
    }
}



const httpCreateOrder = async (values: any, session: any, toast: any, files: any[]) => {
    try {
        const formData = new FormData();


        // // Append form data
        formData.append('data', JSON.stringify(values));
        // formData.append('ref', 'order');
        // formData.append('refId', '37');
        // formData.append('field', 'clientFiles');

        // Append files, if available
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append(`files.clientFiles`, files[i]);
            }
        }

        const res = await fetch(`http://${HOST}:5000/api/orders`, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + session.user.jwt,
            },
            body: formData,
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 200) {
            toast({
                title: "Success!!",
                description: "Order Created Successfully",
            });
            return true;
        } else {
            console.log(res);
            toast({
                title: "Failed",
                description: "Order Creation Failed",
            });
            return false;
        }
    } catch (err) {
        console.error('Error:', err);
        toast({
            title: "Failed",
            description: "Order Creation Failed",
        });
        return false;
    }
};

export { httpGetWriters, httpGetClients, httpCreateOrder, httpGetOrders, httpGetOrder };