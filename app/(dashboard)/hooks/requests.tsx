require('dotenv').config();

const HOST = process.env.HOST || 'localhost';
const PORT = 3000;

const httpGetWriters = async (session: any = null) => {
    try {
        const res = await fetch(
            `http://${HOST}:${PORT}/api/v1/users?role=WRITER`, {
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
            `http://${HOST}:${PORT}/api/v1/users?role=CLIENT`, {
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

async function httpGetOrders(session: any = null) {
    try {
        const res = await fetch(
            `http://${HOST}:${PORT}/api/v1/orders`, {

            next: { revalidate: 60 },
        })
        return res.status == 200 ? await res.json() : [];
    }
    catch (err) {
        console.error(err)
    }
}

const httpGetOrder = async (id: string) => {
    try {
        const res = await fetch(
            `http://${HOST}:${PORT}/api/v1/orders/${id}`)
        return res.status == 200 ? await res.json() : {};

    }
    catch (err) {
        console.error(err)
    }
}



const httpCreateOrder = async (values: any, session: any, toast: any, files: FileList | null) => {
    try {
        const formData = new FormData();


        // // Append form data
        formData.append('data', JSON.stringify(values));
        // formData.append('ref', 'order');
        // formData.append('refId', '37');
        // formData.append('field', 'clientFiles');

        // Append files, if available
        if (files) {
            for (let i = 0; i < files?.length; i++) {
                formData.append(`files`, files[i]);
            }
        }

        const res = await fetch(`http://${HOST}:${PORT}/api/v1/orders`, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + session.user.jwt,
            },
            body: formData,
        });

        const data = await res.json();


        if (res.status === 201) {
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

const httpUpdateWriter = async (id: string, writerId: string, session: any, toast: any) => {
    try {
        const res = await fetch(`http://${HOST}:${PORT}/api/v1/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + session.user.jwt,
            },
            body: JSON.stringify({ writer: writerId }),
        });

        if (res.status === 200) {
            toast({
                title: "Success!!",
                description: "Order Updated Successfully",
            });
            return true;
        } else {
            toast({
                title: "Failed",
                description: "Order Update Failed",
            });
            return false;
        }
    } catch (err) {
        console.error('Error:', err);
        toast({
            title: "Failed",
            description: "Order Update Failed",
        });
        return false;
    }
}

export { httpGetWriters, httpGetClients, httpCreateOrder, httpGetOrders, httpGetOrder };