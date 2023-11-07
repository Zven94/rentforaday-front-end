import { useState } from 'react';
import './AddItem.css';

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
      const response = await fetch('http://localhost:3000/api/v1/items', {
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
    <main className="d-flex flex-column justify-content-center align-items-center h-100 main-background">
      <div className="d-flex flex-column justify-content-center align-items-center h-50  rounded div-form">
        <h1>New Item</h1>
        <div className="p-3">
          <form action="/api/v1/items" method="post" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="form-label">
                Name
                <input type="text" id="name" name="name" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="city" className="form-label">
                City
                <input type="text" id="city" name="city" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="description" className="form-label">
                Description
                <input type="text" id="description" name="description" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="price" className="form-label">
                Price
                <input type="text" id="price" name="price" className="form-control" />
              </label>
            </div>
            <div>
              <label htmlFor="image" className="form-label">
                Image
                <input type="file" id="image" name="image" className="form-control" />
              </label>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">Add Item</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        {message && <p>{message}</p>}
      </div>
    </main>
  );
}
