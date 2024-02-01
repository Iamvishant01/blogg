"use client";

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'
import { NextResponse } from 'next/server';
export const dynamic = "force-dynamic";
const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams?.get('id');
  if (!promptId) {
    return NextResponse.json({
      message: "Not found"
    })
  }
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({
    prompt: '',
    tag: '',
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`api/prompt/${promptId}`)
      const data = await response.json();

      setpost({
        prompt: data.prompt,
        tag: data.tag,
      })
    }
    if (promptId) getPromptDetails();
  }, [promptId])

  const updatePromt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setsubmitting(false);
    }
  }

  return (
    <div>

      <Suspense fallback={<div>Loading...</div>}>

        <Form
          type="Edit"
          post={post}
          setpost={setpost}
          submitting={submitting}
          handleSubmit={updatePromt}
        />
      </Suspense>
    </div>
  )
}

export default UpdatePost