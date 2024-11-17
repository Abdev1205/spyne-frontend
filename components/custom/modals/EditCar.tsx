"use client";

import React, { useEffect } from "react";
import Modal from ".";
import { ModalProps, ChildModalProps } from ".";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdClose } from "react-icons/md";
import { CustomImage } from "../CustomImage";
import { CarInterface } from "@/app/car/[id]/page";
import api from "@/utils/axios";
import { ApiUrl } from "@/utils/BaseUrl";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),

  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(50, { message: "Min 50 char is required" }),

  tags: z.string().min(1, { message: "Tags is required" }),
});

interface EditCardProps extends ChildModalProps {
  id: string;
}

const EditCar: React.FC<EditCardProps> = ({
  visible,
  onClose = () => {},
  callback = () => {},
  focusMode = false,
  id = "",
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const [carData, setCarData] = useState<CarInterface | null>(null);

  const getCarData = async () => {
    try {
      const carData = await api.get("/api/car/" + id, {
        withCredentials: true,
      });
      setCarData(carData.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCarData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      title: carData?.title,
      description: carData?.description,
      tags: "carData?.tags",
    },
  });

  useEffect(() => {
    if (carData) {
      form.reset({
        title: carData.title || "",
        description: carData.description || "",
        tags: carData.tags?.join(", ") || "",
      });
      setUploadedFiles(carData.images);
    }
  }, [carData, form]);

  // Initialize Uppy
  const uppy = new Uppy({
    restrictions: {
      maxNumberOfFiles: 10,
      allowedFileTypes: ["image/*"],
    },
    autoProceed: true, // Automatically start uploading on file selection
  })
    .use(XHRUpload, {
      endpoint: `${ApiUrl}/api/uploads/images`,
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

  const handleModalClose = () => {
    onClose();
    callback();
  };

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

      const response = await fetch(`${ApiUrl}/api/car/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Car Updated successfully!");
        form.reset();
        setUploadedFiles([]);
        handleModalClose();
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.message}`);
      }
    } catch (err: any) {
      toast.error(err.error);
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      callback={callback}
      focusMode={focusMode}
    >
      <div className=" relative w-[40rem] p-8  bg-white h-[90vh] rounded-[.4rem]  overflow-y-auto overflow-x-hidden  ">
        <div
          onClick={(e) => onClose()}
          className=" absolute flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] right-[.5rem] top-[.5rem] border-[#7436d8] shadow-md hover:text-white hover:bg-[#7436d8] hover:border-white cursor-pointer "
        >
          <MdClose className=" text-[1.3rem]  " />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[1rem] "
          >
            {/* Car Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Car Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your car title"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
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
                  <FormLabel className="text-[1rem] font-[400]">
                    Car Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter car description"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
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
                  <FormLabel className="text-[1rem] font-[400]">
                    Tags (comma-separated){" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter car Tags e.g., sedan, electric, luxury"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Uppy Dashboard */}
            <div className="flex gap-[1rem] flex-col">
              <FormLabel className="text-[1rem] font-[400]">
                Upload Images <span className="text-red-500">*</span>
              </FormLabel>
              <Dashboard
                uppy={uppy}
                height={200}
                proudlyDisplayPoweredByUppy={false}
              />
            </div>

            {/* Uploaded Images Preview */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <FormLabel>Uploaded Images</FormLabel>
                <div className="duration-700 flex gap-[1rem] h-full overflow-x-auto pb-[.5rem] ">
                  {uploadedFiles.map((url, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-[3.5rem] flex-shrink-0"
                    >
                      {/* Remove Icon */}
                      <div
                        onClick={() => {
                          // Remove the image from uploadedFiles
                          setUploadedFiles((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute z-[10] top-0 right-0 w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full cursor-pointer hover:bg-red-600"
                      >
                        <MdClose className=" text-[1rem] " />
                      </div>
                      {/* Image */}
                      <CustomImage
                        width={100}
                        height={100}
                        src={url}
                        alt={`Uploaded Image ${index + 1}`}
                        className="w-full h-full rounded-[.2rem] object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className={`rounded-[.2rem] bg-primary hover:bg-primary/85 font-[500] font-poppins py-[1.3rem]  `}
            >
              Update Car
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default EditCar;
