import React, { useState } from "react";
import { Search, Plus } from "lucide-react";

const DocumentCompliance = () => {
  const [documents] = useState([
    {
      name: "Property deed - lekki apartment",
      property: "Lekki apartment",
      date: "Feb 2, 2025",
      status: "Verified",
    },
    {
      name: "Tenancy agreement–banana island villa",
      property: "Banana island villa",
      date: "Jan 25, 2025",
      status: "Verified",
    },
    {
      name: "Agent license",
      property: "No property",
      date: "Jan 18, 2025",
      status: "Pending",
    },
    {
      name: "Compliance certificate-victoria island",
      property: "Victoria island",
      date: "Apr 15, 2025",
      status: "Verified",
    },
    {
      name: "Hodge area letainance",
      property: "Compliance",
      date: "Aug 15, 2025",
      status: "Expired",
    },
  ]);

  const complianceSummary = {
    total: 15,
    verified: 10,
    pending: 3,
    expiring: 2,
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Document compliance</h1>
          <p className="text-gray-600 text-sm">
            Securely upload, verify and manage all your legal and compliance
            documents.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition">
          <Plus size={18} /> Upload new document
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Property deed</option>
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>Verified</option>
        </select>
        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>All dates</option>
        </select>
        <div className="flex items-center border rounded-lg px-2 w-48">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-2 py-1 text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Document name</th>
                <th className="px-4 py-3">Linked property</th>
                <th className="px-4 py-3">Upload date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-3">{doc.name}</td>
                  <td className="px-4 py-3">{doc.property}</td>
                  <td className="px-4 py-3">{doc.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        doc.status
                      )}`}
                    >
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compliance Status */}
        <div className="bg-white border rounded-xl shadow-sm p-5 h-fit">
          <h2 className="text-lg font-semibold mb-4">Compliance status</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Total documents</span>
              <span className="font-semibold">{complianceSummary.total}</span>
            </li>
            <li className="flex justify-between">
              <span>Verified</span>
              <span className="font-semibold">{complianceSummary.verified}</span>
            </li>
            <li className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold">{complianceSummary.pending}</span>
            </li>
            <li className="flex justify-between">
              <span>Expiring soon</span>
              <span className="font-semibold">{complianceSummary.expiring}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentCompliance;
