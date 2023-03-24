const router= require("express").Router();
let Profile=require("../models/Profile");

//Insert Profile part

router.route("/add").post((req,res)=>{
    const first_name=req.body.first_name;
    const last_name=Number(req.body.last_name);
    const email=(req.body.email);
    const contact_no=Number(req.body.contact_no);
    const src=(req.body.src);

    const newProfile=new Profile({

        first_name,
        last_name,
        email,
        contact_no,
        src
    })

    newProfile.save().then(()=>{
        res.json("Profile Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//Look the inserted data
router.route("/").get((req,res)=>{
    
    Profile.find().then((profile)=>{
        res.json(profile)
    }).catch((err)=>{
        console.log(err)
    })

})


//update data
router.route("/update/:id").put(async(req,res)=>{
    let userId =req.params.id;
    const {first_name,last_name,email,user_name,contact_no,cpassword,npassword} =req.body;

    const updateProfile  ={
        first_name,
        last_name,
        email,
        contact_no,
        src
    }//create objects

    const update = await Profile.findByIdAndUpdate(userId,updateProfile).then(()=>{
        res.status(200).send({status: "user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
   
})

//delete

router.route("/delete/:id").delete(async(req,res)=>{
    let userId=req.params.id;

    await Profile.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted"})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with dlete user", error: err.message});
    })
})

//get one user details

router.route("/get/:id").get(async(req,res)=>{
    let userId=req.params.id;
    await Profile.findById(userId).then((profile)=>{
        res.status(200).send({status: "User fetched", user})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})


//save profile or create 

router.post('/saveProfile',async(req,res)=>{

    try {
        const first_name=req.body.first_name;
    const last_name=Number(req.body.last_name);
    const email=(req.body.email);
    const contact_no=Number(req.body.contact_no);
    const src=(req.body.src);

    const newProfile=new Profile({

        first_name,
        last_name,
        email,
        contact_no,
        src
    })

    const data=await Profile.create(newProfile)
    return res.send(data)
    } catch (error) {
       console.log(error) 
    }
    
})



module.exports=router;
