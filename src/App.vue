<template>

        <div v-show="!isEditMode" >
            <h1>User profile</h1>

            <img :src="image">

            <span>Name: </span><b id="name">{{ name }}</b>
            <hr/>

            <span>Email: </span><b id="email">{{ email }}</b>
            <hr/>

            <span>Interest: </span><b id="interest">{{ interest }}</b>
            <hr/>

            

            <button @click="handleEditProfile">Edit Profile</button>

            
        </div>



            <div v-show="isEditMode" >
                <h1>User profile</h1>
                <img :src="image">
                <span>Name: </span>
                <input id="input-name" type="text" v-model="name"/>
                <hr/>

                <span>Email: </span>
                <input  id="input-email" type="text" v-model="email"/>
                <hr/>

                <span>Interest: </span>
                <input id="input-interest" type="text" v-model="interest"/>
                <hr/>

                <button @click="handleUpdateProfile">Update Profile</button>


            </div>

</template>


<script>
    import image from "./image11.jpeg"


    export default{
        name:"App",
        
        data() {
            return {
                image: image,
                name: "",
                email: "",
                interest: "",
                isEditMode: false



            }
        },

       async created(){
       const userData =   await this.fetchUserProfile()
       this.name =userData.name
       this.email =userData.email
       this.interest = userData.interest

        },


        methods: {
             handleEditProfile(){

                this.isEditMode = true
                
             },

             async   handleUpdateProfile(){
                    const payload = {
                        name: this.name,
                        email: this.email,
                        interest: this.interest
                    }
                const resJson =   await this.updateUserprofile(payload)
                console.log(resJson)

                    this.isEditMode = false
                },

              async fetchUserProfile(){
                  const res = await fetch('get-profile')
                 return  await res.json()
                },
                async updateUserprofile(payload){
                 const res =   await fetch('update-profile',{
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json",
                            'Accept': "application/json"
                        },

                        body: JSON.stringify(payload)
                    })
                    return await res.json()
                }
            }
    }

</script>

<style>




img {
    width: 320px;
    height: 270px;
    display: block;
    margin-bottom: 40px;

}

div {
    margin: 40px;
    width: 80%;
    
}

hr {
    width: 400px;
    margin: 25px 0px;

}

button {

    width: 160;
    font-size: 15px;    
    height: 45px;
    border-radius: 5px;


}

button:hover {
    cursor: pointer;
    
}

input{
    width: 200px;
    font-size: 15px;
    padding: 10px;

}



.datePicker has-popup {
    margin-top: 0px;
    margin-bottom: 0;
    display: contents;
}



</style>