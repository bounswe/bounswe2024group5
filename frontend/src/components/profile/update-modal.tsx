import { Modal, Form, Input, message } from "antd";

import type { ProfileRequest, ProfileResponse } from "../../types/profile";

interface ProfileUpdateModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (updates: ProfileRequest) => Promise<void>;
  initialData: ProfileResponse;
  isUpdating: boolean;
}

const ProfileUpdateModal = ({
  open,
  onClose,
  onUpdate,
  initialData,
  isUpdating,
}: ProfileUpdateModalProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onUpdate(values);
      message.success("Profile updated successfully");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Failed to update profile");
      }
    }
  };

  return (
    <Modal
      title="Update Profile"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={isUpdating}
      okText="Save Changes"
      cancelText="Cancel"
      className="rounded-2xl"
      okButtonProps={{
        style: {
          backgroundColor: "#8B5CF6",
          color: "white",
          borderRadius: "10px",
        },
      }}
      cancelButtonProps={{
        style: {
          backgroundColor: "white",
          borderRadius: "10px",
          color: "red",
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: initialData.name,
          email: initialData.email,
        }}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter your name" },
            { min: 2, message: "Name must be at least 2 characters" },
          ]}
        >
          <Input placeholder="Enter your name" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          name="profilePicture"
          label="Profile Picture URL"
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
        >
          <Input
            placeholder="Enter profile picture URL"
            className="rounded-lg"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileUpdateModal;
