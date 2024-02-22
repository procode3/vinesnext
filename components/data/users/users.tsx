type User = {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    provider: string
    password: string
    resetPasswordToken: string
    confirmationToken: string
    confirmed: boolean
    blocked: boolean
    role: 'admin' | 'writer' | 'client' | 'manager'
    created_at: string
    updated_at: string
}

const getUsers = () => {  
    const data: User[] = [
        {
          "id": 1,
          "firstName": "George",
          "lastName": "Wambani",
          "email": "admin1@example.com",
          "phone": "1234567890",
          "provider": "local",
          "password": "admin1pass",
          "resetPasswordToken": "",
          "confirmationToken": "",
          "confirmed": true,
          "blocked": false,
          "role": "admin",
          "created_at": "2023-07-07T10:00:00Z",
          "updated_at": "2023-07-07T10:00:00Z"
        },
        {
          "id": 2,
          "firstName": "George",
          "lastName": "Wambani",
          "email": "admin2@example.com",
          "phone": "0987654321",
          "provider": "local",
          "password": "admin2pass",
          "resetPasswordToken": "",
          "confirmationToken": "",
          "confirmed": true,
          "blocked": false,
          "role": "admin",
          "created_at": "2023-07-07T11:00:00Z",
          "updated_at": "2023-07-07T11:00:00Z"
        },
        {
          "id": 3,
          "firstName": "George",
          "lastName": "Wambani",
          "email": "writer1@example.com",
          "phone": "9876543210",
          "provider": "local",
          "password": "writer1pass",
          "resetPasswordToken": "",
          "confirmationToken": "",
          "confirmed": true,
          "blocked": false,
          "role": "writer",
          "created_at": "2023-07-07T12:00:00Z",
          "updated_at": "2023-07-07T12:00:00Z"
        },
        {
          "id": 4,
          "firstName": "George",
          "lastName": "Wambani",
          "email": "writer2@example.com",
          "phone": "0123456789",
          "provider": "local",
          "password": "writer2pass",
          "resetPasswordToken": "",
          "confirmationToken": "",
          "confirmed": true,
          "blocked": false,
          "role": "writer",
          "created_at": "2023-07-07T13:00:00Z",
          "updated_at": "2023-07-07T13:00:00Z"
        }
      ]
      return data
    }

function createUser(user: User) {
    const data = getUsers()
    data.push(user)
    return data
    }
    
function updateUser(user: User) {
    const data = getUsers()
    const index = data.findIndex((u) => u.id === user.id)
    data[index] = user
    return data
}

function deleteUser(id: number) {
    const data = getUsers()
    data.filter((u) => u.id !== id)
    return data
}
function getAvatarName(user: User) {
    return `${user.firstName[0]}${user.lastName[0]}`
}

export {type User, getUsers, createUser, updateUser, deleteUser, getAvatarName }