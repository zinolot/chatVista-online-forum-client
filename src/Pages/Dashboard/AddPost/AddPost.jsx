import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const [authorImage, setAuthorImage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [tag, setTag] = useState(null);
  const [postTime, setPostTime] = useState('');
  const [postImg, setPostImg] = useState('');

  const tagOptions = [
    { value: 'General', label: 'General' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Movies', label: 'Movies' },
    { value: 'Music', label: 'Music' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Sports', label: 'Sports' },
    // Add more tag options as needed
  ];

  const handleTagChange = (selectedOption) => {
    setTag(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !validateUrl(authorImage) ||
      !authorName ||
      !validateEmail(authorEmail) ||
      !postTitle ||
      !postDescription ||
      !tag ||
      !postTime ||
      !validateUrl(postImg)
    ) {
      alert('Please fill in all required fields with valid information.');
      return;
    }

    // Prepare the data to be sent to the server
    const postData = {
      authorImage,
      authorName,
      authorEmail,
      postTitle,
      postDescription,
      tag: tag.value, // Send the value of the selected tag
      postTime,
      postImg,
    };

    try {
      // Send a POST request to your server using Axios
      const response = await axiosSecure.post('/posts', postData);

      // Handle the response as needed
      console.log('Server response:', response);

      // Reset the form fields after successful submission
      setAuthorImage('');
      setAuthorName('');
      setAuthorEmail('');
      setPostTitle('');
      setPostDescription('');
      setTag(null);
      setPostTime('');
      setPostImg('');

      // Optionally, you can perform additional actions based on the server response
    } catch (error) {
      // Handle errors
      console.error('Error submitting the form:', error);
    }
  };


  const validateUrl = (url) => {
    // Basic URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const validateEmail = (email) => {
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Add a New Post</h2>
      <form className="max-w-md mx-auto bg-white p-8 border rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Image (URL):</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={authorImage}
            onChange={(e) => setAuthorImage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Name:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Author Email:</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Title:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Description:</label>
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Tag:</label>
          <Select className="w-full" options={tagOptions} value={tag} onChange={handleTagChange} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Time:</label>
          <DatePicker
            selected={postTime}
            onChange={(date) => setPostTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Post Image (URL):</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={postImg}
            onChange={(e) => setPostImg(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white p-2 rounded hover:bg-gray-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
