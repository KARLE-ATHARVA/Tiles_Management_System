// src/pages/admin/HistoryPage.js
import React, { useEffect, useState } from 'react';
import API from '../../api';

const HistoryPage = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = async () => {
    try {
      const res = await API.get('/Logs');
      const sortedLogs = res.data.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp) // latest to oldest
      );
      setLogs(sortedLogs);
    } catch (err) {
      alert('Failed to fetch activity logs.');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatISTTime = (timestamp) => {
    const utcDate = new Date(timestamp);
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in ms
    const istDate = new Date(utcDate.getTime() + istOffset);

    return istDate.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    return (
      log.action.toLowerCase().includes(term) ||
      log.performedBy.toLowerCase().includes(term) ||
      formatISTTime(log.timestamp).toLowerCase().includes(term)
    );
  });

  const visibleLogs = searchTerm ? filteredLogs : logs.slice(0, 20);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-brand">Admin Activity History</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by action, user, or date..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden max-h-[500px] overflow-y-auto border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase sticky top-0 z-10">
            <tr>
              <th className="p-3">Date & Time (IST)</th>
              <th className="p-3">Action</th>
              <th className="p-3">Performed By</th>
            </tr>
          </thead>
          <tbody>
            {visibleLogs.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No logs found.
                </td>
              </tr>
            ) : (
              visibleLogs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{formatISTTime(log.timestamp)}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">{log.performedBy}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
       <p className="text-sm text-gray-500 mt-3">
        Showing {searchTerm ? filteredLogs.length : Math.min(20, logs.length)}{" "}
        {searchTerm ? "search result(s)" : "latest activity log(s)"}
      </p>
    </div>
  );
};

export default HistoryPage;
