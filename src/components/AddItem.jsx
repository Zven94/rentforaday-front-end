import { useState } from 'react';
import itemAPI from '../API/itemAPI';
import '../styles/AddItem.css';

export default function AddItem() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    formData.append('item[name]', form.name.value);
    formData.append('item[city]', form.city.value);
    formData.append('item[description]', form.description.value);
    formData.append('item[price]', form.price.value);
    formData.append('item[image]', form.image.files[0]);

    try {
      const response = await fetch(`${itemAPI.baseURL}${itemAPI.listItems}`, {
        method: 'POST',
        headers: {},
        body: formData,
      });

      if (response.ok) {
        // Manejar la respuesta si la solicitud fue exitosa
        setMessage('Item added successfully!');
        event.target.reset();
      } else {
        // Manejar errores si la solicitud falla
        setMessage('Failed to add item');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="addItemCotent d-flex flex-column justify-content-center align-items-center">
        <div className="div-form d-flex flex-column justify-content-center align-items-center gap-2">
          <h1 className="formTitle">New Item</h1>
          <div className="d-flex p-3">
            <form action={itemAPI.listItems} method="post" onSubmit={handleSubmit} className="div-form d-flex flex-column justify-content-center align-items-center gap-1">
              <div>
                <label htmlFor="name" className="form-label" aria-label="Name">
                  <input type="text" id="name" name="name" placeholder="Name" className="form-control" />
                </label>
              </div>
              <div>
                <label htmlFor="city" className="form-label" aria-label="City">
                  <input type="text" id="city" name="city" placeholder="City" className="form-control" />
                </label>
              </div>
              <div>
                <label htmlFor="description" className="form-label" aria-label="Description">
                  <input type="text" id="description" name="description" placeholder="Description" className="form-control" />
                </label>
              </div>
              <div>
                <label htmlFor="price" className="form-label" aria-label="Price">
                  <input type="text" id="price" name="price" placeholder="Price" className="form-control" />
                </label>
              </div>
              <div>
                <label htmlFor="image" className="form-label">
                  Image
                  <input type="file" id="image" name="image" className="form-control" />
                </label>
              </div>
              <button type="submit" className="btn btn-primary">Add Item</button>
            </form>
          </div>
        </div>
        <div className="div-message">
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}
