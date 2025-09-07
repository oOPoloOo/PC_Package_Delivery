import { useState, useContext } from "react";
import PackageContext from "../../contexts/PackageContext";
import type { CreatePackageRequest } from "../../types";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const NewPackagePage = () => {

  const { addPackage } = useContext(PackageContext) as PackageContextType;
  const navigate = useNavigate();


  const [formData, setForm] = useState<CreatePackageRequest>({
    SenderName: "",
    SenderAddress: "",
    SenderPhone: "",
    RecipientName: "",
    RecipientAddress: "",
    RecipientPhone: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const result = await addPackage(formData);
    if ("error" in result) {
      toast.error(result.error);
    } else {
       toast.success(result.success || 'Package added successfully.');
      setTimeout(() => navigate('/'), 2500);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label className="block font-medium">Sender Name</label>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sender Address</label>
          <textarea
            name="senderAddress"
            value={formData.senderAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sender Phone</label>
          <input
            type="tel"
            name="senderPhone"
            value={formData.senderPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Recipient Address</label>
          <textarea
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Recipient Phone</label>
          <input
            type="tel"
            name="recipientPhone"
            value={formData.recipientPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Package
        </button>
      </form>
    </div>
  );
};

export default NewPackagePage;
