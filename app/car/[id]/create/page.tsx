"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Dashboard } from "@uppy/react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";

import "react-toastify/dist/ReactToastify.css";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CarForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  // Initialize Uppy
  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: 10,
      allowedFileTypes: ["image/*"],
    },
    autoProceed: true, // Automatically start uploading on file selection
  })
    .use(XHRUpload, {
      endpoint: "http://localhost:4000/api/uploads/images",
      fieldName: "image",
    })
    .on("upload-success", (file, response) => {
      // Safely cast the response to the expected interface
      const data = response?.body?.data as { path: string } | undefined;

      if (data?.path) {
        const uploadedUrl = data.path; // Now TypeScript knows path exists
        setUploadedFiles((prev) => [...prev, uploadedUrl]);
        // toast.success(`Image ${file?.name} uploaded successfully!`);
      } else {
        console.error("Path is not available in the response data.");
      }
    })
    .on("complete", () => {
      toast.success("All selected images have been uploaded!");
    });

  const onSubmit = async (data: any) => {
    try {
      if (uploadedFiles.length === 0) {
        toast.error("Please upload at least one image.");
        return;
      }

      const carData = {
        title: data.title,
        description: data.description,
        tags: data.tags.split(",").map((tag: string) => tag.trim()),
        images: uploadedFiles,
      };

      const response = await fetch("http://localhost:4000/api/car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Car created successfully!");
        form.reset();
        setUploadedFiles([]);
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (err: any) {
      toast.error(err.error);
    }
  };

  return (
    <div className=" flex  bg-white w-[100%] h-full justify-center items-center ">
      <div className=" w-[30rem] ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Car Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Title</FormLabel>
                  <Input placeholder="Enter car title" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Car Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Car Description</FormLabel>
                  <Input placeholder="Enter car description" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Car Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <Input
                    placeholder="e.g., sedan, electric, luxury"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Uppy Dashboard */}
            <div className="my-4">
              <FormLabel>Upload Images</FormLabel>
              <Dashboard
                uppy={uppy}
                height={400}
                proudlyDisplayPoweredByUppy={false}
              />
            </div>

            {/* Uploaded Images Preview */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <FormLabel>Uploaded Images</FormLabel>
                <div className="grid grid-cols-3 gap-2">
                  {uploadedFiles.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded Image ${index + 1}`}
                      className="h-24 w-24 rounded-md object-cover border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Create Car
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CarForm;
