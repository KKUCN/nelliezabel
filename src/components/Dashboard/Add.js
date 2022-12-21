import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { newWord } from 'hooks/newWord';
import { getWords } from 'hooks/getWords';
import { uploadVideo } from 'lib/config/firebase.config';
const Add = ({ words, setWords, setIsAdding, setAdded }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [id, setId] = useState('');
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [video, setVideo] = useState('');
  
  const handleAdd = async(e) => {
    e.preventDefault()

    //Se inhabilita el botón mientras que se sube el video
    setIsWaiting(true)
    if (!word || !description || !category || !video) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos',
        showConfirmButton: true,
      });
      setIsWaiting(false)
    }
    try{
    //AGREGADO
    const url = await uploadVideo(video)    //Se almacena el video en Firebase Storage    
    newWord(word,description,category,url)
    Swal.fire({
      icon: 'success',
      title: 'Agregada!',
      text: `La palabra ${word} ha sido añadida`,
      showConfirmButton: false,
      timer: 1500,
    });
    setAdded(true)
    setIsWaiting(false)
    setIsAdding(false)
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `Ha ocurrido un error durante la transacción!`,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsWaiting(false)
    }
  };

  return (
    
    <div className="container">
      <div>
        
      </div>  
      <form className="w-5/6 m-8" onSubmit={handleAdd}>
        
        <h1 className="bg-secondaryHeader  h-[4rem] shadow-2xl z-1 text-center font-bold indent-12 text-white align-baseline ">Nueva palabra</h1>
        <div className='flex items-baseline space-x-5 text-3xl' > 
        <label className="" htmlFor="word">Palabra</label>
        <input
          id="word"
          type="text"
          name="word"
          value={word}
          onChange={e => setWord(e.target.value)}
        />
        </div>
        <div className='flex items-baseline space-x-5 text-3xl'>
        <label className="" htmlFor="word">Descripción</label>
        <input
          className="bg-white"
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        </div>
        
        <div className='flex items-baseline space-x-5 text-3xl'>
        <label htmlFor="category">Categoría</label>
          <select 
            className='form-select'
            name="category" 
            id="category"
            onChange={e => setCategory(e.target.value)}   
          >
            <option value="">Selecciona una categoria</option>
            <option value="Educación">Educación</option>
            <option value="Psicología">Psicología</option>
            <option value="Jurídico">Jurídico</option>
          </select>
        </div>
        
        <div className='flex items-baseline space-x-5 text-3xl'>
        <label htmlFor="video">Subir video </label>
        <input
          id="video"
          type="file"
          name="video"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={e => setVideo(e.target.files[0])}
        />
        </div>
        
        
        
        <div style={{ marginTop: '30px' }}>
          {!isWaiting &&(
            <button class="btn btn-success disabled:opacity-50">Añadir</button>
          )}
        
          {isWaiting &&(
            <div className="flex items-center justify-center ">
              <div className="w-16 h-16 border-b-2 border-purple-700 rounded-full animate-spin"></div>
            </div>
          )}
        <button hidden={isWaiting == true ? true : false }class="btn btn-error" style={{ marginLeft: '12px'}}onClick={() => setIsAdding(false)}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
