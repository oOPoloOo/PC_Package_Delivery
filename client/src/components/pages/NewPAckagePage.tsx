import { useState, useContext } from "react";
import PackageContext from "../../contexts/PackageContext";
import type { CreatePackageRequest, PackageContextType } from "../../types";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const NewPAckagePage = () => {

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await addPackage(formData);
    if ("error" in result) {
      toast.error(result.error);
    } else 
    {
      // Navigate immediately after toast closes
      toast.success('Package added successfully.', {
        autoClose: 1700,
        onClose: () => navigate("/", { replace: true }),
      });
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
            name="SenderName"
            value={formData.SenderName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sender Address</label>
          <textarea
            name="SenderAddress"
            value={formData.SenderAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sender Phone</label>
          <input
            type="tel"
            name="SenderPhone"
            value={formData.SenderPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block font-medium">Recipient Name</label>
          <input
            type="text"
            name="RecipientName"
            value={formData.RecipientName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Recipient Address</label>
          <textarea
            name="RecipientAddress"
            value={formData.RecipientAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Recipient Phone</label>
          <input
            type="tel"
            name="RecipientPhone"
            value={formData.RecipientPhone}
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

export default NewPAckagePage;
