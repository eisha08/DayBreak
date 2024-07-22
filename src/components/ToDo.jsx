import React, { useState, useEffect } from "react";
import task from "../assets/task.png";
import { Link ,useNavigate} from "react-router-dom";
import { IoCloseSharp, IoPencilSharp } from "react-icons/io5";

import axios from "axios";

function ToDo() {
  const navigate = useNavigate();
  let id = sessionStorage.getItem("id");
  useEffect(()=>{
    if(!id)
      navigate('/login');
  },[])
  // if(id==null)
      
  // useEffect(() => {
  //   if (!id) {
  //     navigate('/login'); // Redirect to the login page if id is not found
  //   }
  // }, [id, navigate]);
  const [isOpen, setIsOpen] = useState(false);

  const [inputs, setInputs] = useState({ 
    title: "",
    Description: "",
    date: "",
  });

  const openPopup = () => {
    setIsOpen(true);
    document.getElementById("background").style.filter = "blur(10px)";
    document.documentElement.scrollTop = 0;
  };
  const closePopup = () => {
    setIsOpen(false);
    document.getElementById("background").style.filter = "blur(0px)";
  };
  useEffect(() => {}, [isOpen]);

  const [editTask, setEditTask] = useState({
    editIndex: -1,
    title: "",
    Description: "",
    date: "",
    _id: null,
  });
  const [todos, setTodos] = useState([]);

  // const submit = async (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   // Validate form inputs (assuming required fields are title and description)
  //   if (!inputs.title || !inputs.description) {
  //     alert("Please fill in all required fields (title and description)");
  //     return;
  //   }

  //   let updatedTodos = todos ? [...todos] : [];
    

  //   // Handle editing an existing task
    
  //   if (editTask.editIndex !== -1) {
  //     updatedTodos[editTask.editIndex] = { ...editTask, ...inputs }; // Update task at index
  //   } else {
  //     // Add a new task
  //     if (id) {
  //       const data = JSON.stringify({
 

  
  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form inputs (assuming required fields are title and description)
    if (!inputs.title || !inputs.description) {   
      alert("Please fill in all required fields (title and description)");
      return;
    }

    let updatedTodos = todos ? [...todos] : [];

    try {
      if (editTask.editIndex !== -1) {
        // Handle updating an existing task
        const updatedTask = {
          title: inputs.title,
          description: inputs.Description,
          date: inputs.date,
        };

        await handleUpdate(editTask._id, updatedTask);

        updatedTodos[editTask.editIndex] = { _id: editTask._id, ...updatedTask }; // Update task at index

      } else {
        // Handle adding a new task
        if (id) {
          const data = {
            title: inputs.title,
            description: inputs.description,
            date: inputs.date,
            id: id,
          };
          console.log(data);

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:8000/api/v2/addTask",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
          };

          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));

          updatedTodos.push(response.data.task); // Add new task to the local state

        } else {
          updatedTodos.push({ ...inputs });
          alert("Your task will not be saved!! Please register");
        }
      }

      setTodos(updatedTodos); // Update the state with the modified todos array
      setInputs({ title: "", Description: "", date: "" }); // Clear form fields
      setEditTask({ editIndex: -1, title: "", description: "", date: "", _id: null }); // Reset edit state
      setIsOpen(false); // Close the popup
      document.getElementById("background").style.filter = "blur(0px)"; // Remove blur effect

      console.log("Task submitted successfully!");

    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  //handleChange
  const change = (e) => {
    //console.log("inside on change");
    // console.log(e.target.name, e.target.value);

    setInputs({ ...inputs, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  //card
 
  const cropDate = (dateString, fullDate = false) => {
    if (!dateString) return ""; // Handle empty deadlines

    const dateObject = new Date(dateString); // Create a Date object

    if (fullDate) {
      // Return full date (month, day, year)
      const options = { year: "numeric", month: "long", day: "numeric" };
      return dateObject.toLocaleDateString("en-US", options);
    } else {
      // Crop to year and month (YYYY-MM format)
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero if needed
      return `${year}-${month}`;
    }
  }
  const renderTodos = () => {
    return todos?.map((todo, index) => (
      <div
        key={index}
        className="todo-card w-[25vw] bg-white rounded-lg shadow-md mx-auto my-4 p-4 flex justify-between items-center"
      >
        <div>
          <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
          <p className="text-gray-700">{todo.Description}</p>
          <div className="flex justify-between items-center text-gray-500">
            <span>Deadline: {cropDate(todo.Deadline, true)}</span>
          </div>
        </div>
        <div className="flex items-center">
          {/* Edit button */}
          <button
            key={index}
            className="mr-2 text-blue-500 hover:text-blue-700"
            onClick={() => {
              handleEdit(index); // Call the edit function
            }} // Call edit function on click
          >
            <IoPencilSharp size={20} />
          </button>
          {/* Delete button */}
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(todo._id)} // Call delete function on click
          >
            <IoCloseSharp size={20} />
          </button>
        </div>
      </div>
    ));
  };
  // Function to handle editing a task
  const handleEdit = (index) => {
    console.log("Editing task at index:", index);
    console.log("Task details:", todos[index]);
    setEditTask({ editIndex: index, _id: todos[index]._id });
    setInputs({
      title: todos[index].title,
      description: todos[index].description,
      date: todos[index].date,
    });
    setIsOpen(true);
  };
  

  const handleUpdate = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v2/updateTask/${id}`, updatedTask, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
  
      // Update the todos state with the updated task
      setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, ...updatedTask } : todo));
      setIsOpen(false); // Close the modal or edit form
    } catch (error) {
      console.error(error);
    }
  };
  

  // Function to handle deleting a task
  const handleDelete = async(id) => {
    console.log(id);
    const data = JSON.stringify({id:id});
    await axios.delete(`http://localhost:8000/api/v2/deleteTask/${id}`,data).then((response)=>{
      console.log(response);
    })
    
  };

  useEffect(()=>{
    const id = sessionStorage.getItem("id");
    if(id){
    const fetch=async()=>{
      await axios.get(`http://localhost:8000/api/v2/getTask/${id}`).then((response)=>{
      setTodos(response.data.list)
      console.log(todos);
      })
    }
    fetch();}
  },[submit])

  return (
    //edit popup

    //popup
    <div>
      <div>
        {isOpen && (
          <div
            className={`fixed inset-0 z-50 bg-gray-500 bg-opacity-50 backdrop-blur-lg`}
          >
            <div className=" popup absolute left-[37%] top-[25%] bg-yellow-200 z-[100] border border-purple-700 rounded-xl shadow-2xl">
              <div className="ml-[12%]">
                <div className="head w-[100%] h-fit  flex justify-center items-center">
                  <div className="text text-purple-700 text-4xl font-semibold font-Poppins">
                    Add Tasks
                  </div>
                  <div className="img ">
                    <img src={task} className="h-[80px] w-[80px]" alt="" />
                  </div>
                </div>
                <div className="box font-Poppins flex flex-col justify-center items-center  ">
                  <div className=" py-4 space-y-2 w-[25vw] mx-[7%]">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={inputs.title}
                      className="py-2 px-2 rounded-lg w-[85%] "
                      placeholder="Add Title"
                      required
                      onChange={change}
                    />
                  </div>
                  <div className="space-y-2 w-[25vw] mx-[7%] ">
                    <textarea
                      id="Description"
                      name="description"
                      type="text"
                      value={inputs.description}
                      className="py-2 px-2 rounded-lg w-[85%] h-[40%] placeholder:text-left "
                      placeholder="Add Description"
                      onChange={change}
                    />
                  </div>
                  <div className=" py-2 space-y-2 w-[25vw] mx-[7%]">
                    <input
                      id="date"
                      type="Date"
                      name="date"
                      value={inputs.date}
                      className="py-2 px-2 rounded-lg w-[85%] text-gray-400"
                      placeholder="Add Deadline"
                      required
                      onChange={change}
                    />
                  </div>
                  <div className="btn font-Poppins bg-purple-700 text-white w-[40%] h-[5vh] rounded-xl mr-[10%] text-center  text-xl mb-4">
                    <button className="py-2" onClick={submit}>
                      <Link aria-current="page" to="/todo">
                        Add Task
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute  z-[100] right-1 top-1 border border-purple-700 bg-purple-700 rounded-3xl ">
                <button className="" onClick={closePopup}>
                  <IoCloseSharp size={24} color="white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        id="background"
        className="main w-[100vw] h-[100vh] bg-yellow-200 pt-10"
      >
        <div className="todo flex justify-between px-4">
          <div className="search-side flex"></div>
          <div className="btn-div font-Poppins flex px-6  bg-purple-700 text-white h-[5vh] rounded-xl ">
            <button onClick={openPopup}>Add Task</button>
          </div>
        </div>

        <div className="todo-list flex flex-wrap justify-center">
          {renderTodos()}
        </div>
      </div>
    </div>
  );
}
export default ToDo;
