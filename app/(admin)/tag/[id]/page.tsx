'use client'

import { useState, useEffect } from "react"

import { useParams } from 'next/navigation';
type Tag = {
  _id: string,
  name: string,
  description: string
}

export default function TagPage () {
  const [tag, setTag] = useState<Tag>({ _id: '', name: '', description: '' });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const { id } = useParams();
  
  useEffect (() => {
    fetchData();
  }, [id])  
  const fetchData = async () => {
      try {
        const tagRes = await fetch(`/api/tag/${id}`)
        if (!tagRes.ok) throw new Error('Failed to fetch user data');
        const tagData = await tagRes.json();
        setTag(tagData.data);
      }
      catch (error: any) {
        console.log(error.message)
      }
  }  
  const resetForm = async () => {
      setName('')
      setDescription('')
    //   setStatus('')
  }  
  const handleUpdateName = async () => {
      if (name == '') {
        setStatus("Name is required")
        return
      }
      const url = `/api/tag/${id}`
      const method = 'PUT'
      const body = JSON.stringify( {
      name : name,
      description : ""
      });
      try {
      const res = await fetch(url, {
          method : method,
          headers : { 'Content-Type': 'application/json' },
          body : body
      })
      const data = await res.json()  
      console.log(data)
      if (data.success) {
          fetchData();
          resetForm();
          setStatus('Name updated successfully');
          } else {
            setStatus(data.error || 'Failed to save Name');
          }
      }
      catch (error: any){
        setStatus(error.message)
      }
  } 
  const handleUpdateDescription = async () => {
    if (description == '') {
      setStatus("Description is required");
      return;
    }
    const url = `/api/tag/${id}`;
    const method = 'PUT';
    const body = JSON.stringify( {
      name : '',
      description : description,
    });
    try {
    const res = await fetch(url, {
      method : method,
      headers : { 'Content-Type': 'application/json' },
      body : body
    });
    const data = await res.json(); 
    if (data.success) {
      fetchData();
      resetForm();
      setStatus('Description updated successfully');
      } else {
        setStatus(data.error || 'Failed to save description');
      }
    }
    catch (error : any){
      setStatus(error.message);
    }
  } 
  return (
    <div>   
      {tag 
      ? (
        <div>
          {status && <p style={{ color: 'red'}}>{status}</p>}
          <p><strong>Name:</strong> {tag.name}</p>
          <p><strong>Description:</strong> {tag.description}</p>
          description
          {/* edit information of tag */}
          <div>
              <input
              type="text"
              placeholder="Tag Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
              <button onClick={handleUpdateName}>
              {'Update'}
              </button>
          </div>
          <div>
              <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={handleUpdateDescription}>
              {'Update'}
              </button>
          </div>
          <div> 
            <button onClick={resetForm}>Cancel</button>
          </div>
        </div>
      )
      : 
      (
        <div> </div>
      )}
    </div>
  )
}