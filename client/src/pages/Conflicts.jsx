import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchConflicts,
  setFilters,
  setPage,
  setLimit,
  resetFilters,
  createConflict,
  updateConflict,
  deleteConflict
} from '../store/slices/dataSlice';
import { showToast } from '../store/slices/uiSlice';
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight, Edit2, Trash2, Plus, Info } from 'lucide-react';
import ConflictModal from '../components/ConflictModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const Conflicts = () => {
  const dispatch = useDispatch();
  const { conflicts, loading, error, page, limit, filters, totalCount } = useSelector((state) => state.data);
  const { role } = useSelector((state) => state.auth);

  // Local state for search query input to avoid dispatching on every keystroke
  const [keywordInput, setKeywordInput] = useState(filters.keyword || '');

  // Local state for CRUD modals
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [activeConflict, setActiveConflict] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch data on page, limit, or filter changes
  useEffect(() => {
    dispatch(fetchConflicts({ page, limit, ...filters }));
  }, [dispatch, page, limit, filters]);

  // Sync error messages to Toast alerts
  useEffect(() => {
    if (error) {
      dispatch(showToast({ message: error, severity: 'error' }));
    }
  }, [error, dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ keyword: keywordInput }));
  };

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleReset = () => {
    setKeywordInput('');
    dispatch(resetFilters());
    dispatch(showToast({ message: 'Filters reset successfully', severity: 'info' }));
  };

  const handleCrudSubmit = async (values) => {
    setActionLoading(true);
    try {
      if (modalMode === 'create') {
        await dispatch(createConflict(values)).unwrap();
        dispatch(showToast({ message: 'Conflict entry created successfully!', severity: 'success' }));
      } else {
        await dispatch(updateConflict({ id: activeConflict._id, conflictData: values })).unwrap();
        dispatch(showToast({ message: 'Conflict entry updated successfully!', severity: 'success' }));
      }
      setIsCrudModalOpen(false);
      dispatch(fetchConflicts({ page, limit, ...filters }));
    } catch (err) {
      dispatch(showToast({ message: err || 'Action failed', severity: 'error' }));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setActionLoading(true);
    try {
      await dispatch(deleteConflict(activeConflict._id)).unwrap();
      dispatch(showToast({ message: 'Conflict entry deleted successfully!', severity: 'success' }));
      setIsDeleteModalOpen(false);
      dispatch(fetchConflicts({ page, limit, ...filters }));
    } catch (err) {
      dispatch(showToast({ message: err || 'Deletion failed', severity: 'error' }));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Conflict Database</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Browse and query global conflict records and economic impact data
          </p>
        </div>
        
        {/* Add Entry Button */}
        <button
          onClick={() => {
            setActiveConflict(null);
            setModalMode('create');
            setIsCrudModalOpen(true);
          }}
          className="flex items-center px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/10 transition cursor-pointer"
        >
          <Plus className="h-5 w-5 mr-1.5" />
          Add Record
        </button>
      </div>

      {/* Filter and Search Panel */}
      <div className="glass-panel p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Keyword Search Input */}
          <div className="md:col-span-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Search by name or country..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Region Filter */}
          <div className="md:col-span-2">
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="block w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            >
              <option value="">All Regions</option>
              <option value="Europe">Europe</option>
              <option value="Middle East">Middle East</option>
              <option value="East Asia">East Asia</option>
              <option value="Africa">Africa</option>
              <option value="South Asia">South Asia</option>
              <option value="Central America">Central America</option>
              <option value="South America">South America</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-2">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="block w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            >
              <option value="">All Statuses</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Sort Selection */}
          <div className="md:col-span-3">
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="block w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            >
              <option value="">Default Sort</option>
              <option value="Conflict_Name">Conflict Name (A-Z)</option>
              <option value="-Inflation_Rate_%">Inflation Rate (High to Low)</option>
              <option value="GDP_Change_%">GDP Change (Highest Loss)</option>
              <option value="Pre_War_Unemployment_%">Pre-War Unemployment (Low to High)</option>
              <option value="-During_War_Unemployment_%">During-War Unemployment (High to Low)</option>
              <option value="Food_Insecurity_Rate_%">Food Insecurity (Low to High)</option>
              <option value="Currency_Devaluation_%">Currency Devaluation (Low to High)</option>
              <option value="Estimated_Reconstruction_Cost_USD">Reconstruction Cost (Low to High)</option>
              <option value="-End_Year">End Year (Latest First)</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-1 flex items-center justify-between gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-slate-950 dark:bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-900 dark:hover:bg-slate-700 transition cursor-pointer text-center text-sm"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Reset all filters"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Main Database Table Grid */}
      <div className="glass-panel rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-850/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="px-6 py-4">Conflict Name</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Years</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">GDP Change</th>
                <th className="px-6 py-4 text-right">Inflation</th>
                <th className="px-6 py-4 text-right">War Cost (USD)</th>
                <th className="px-6 py-4 text-right">Recon Cost (USD)</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800/80">
              {loading ? (
                // Skeleton Loader Rows
                Array.from({ length: limit }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-28"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-14"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12 ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12 ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20 ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20 ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-16 mx-auto"></div></td>
                  </tr>
                ))
              ) : conflicts.length === 0 ? (
                // Empty State View
                <tr>
                  <td colSpan="11" className="text-center py-12 text-slate-500 dark:text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <Info className="h-10 w-10 text-slate-400 mb-2 animate-bounce" />
                      <p className="font-semibold text-lg">No records found</p>
                      <p className="text-sm">Try relaxing your search terms or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                // Data Rows
                conflicts.map((conflict) => (
                  <tr key={conflict._id} className="hover:bg-slate-100/35 dark:hover:bg-slate-800/20 text-slate-700 dark:text-slate-300 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">
                      {conflict.Conflict_Name}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[100px]">{conflict.Primary_Country}</td>
                    <td className="px-6 py-4">{conflict.Region}</td>
                    <td className="px-6 py-4">{conflict.Conflict_Type}</td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {conflict.Start_Year} - {conflict.End_Year || 'Ongoing'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          conflict.Status?.toLowerCase() === 'ongoing'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                        }`}
                      >
                        {conflict.Status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-medium text-rose-600 dark:text-rose-400">
                      {conflict.GDP_Change_Percentage ? `${conflict.GDP_Change_Percentage}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-slate-900 dark:text-white">
                      {conflict.Inflation_Rate_Percentage ? `${conflict.Inflation_Rate_Percentage}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-medium text-slate-900 dark:text-white">
                      {conflict.Cost_of_War_USD ? `$${conflict.Cost_of_War_USD.toLocaleString()}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-medium text-violet-600 dark:text-violet-400">
                      {conflict.Estimated_Reconstruction_Cost_USD ? `$${conflict.Estimated_Reconstruction_Cost_USD.toLocaleString()}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setActiveConflict(conflict);
                            setModalMode('edit');
                            setIsCrudModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
                          title="Edit Record"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setActiveConflict(conflict);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
                          title="Delete Record"
                          disabled={role !== 'admin'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 gap-4">
          {/* Limit Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => dispatch(setLimit(parseInt(e.target.value)))}
              className="px-2 py-1 rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Page Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
              disabled={page === 1 || loading}
              className="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold px-4 text-slate-700 dark:text-slate-300">
              Page {page}
            </span>
            <button
              onClick={() => dispatch(setPage(page + 1))}
              disabled={conflicts.length < limit || loading}
              className="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CRUD Modals */}
      <ConflictModal
        isOpen={isCrudModalOpen}
        onClose={() => setIsCrudModalOpen(false)}
        onSubmit={handleCrudSubmit}
        conflict={activeConflict}
        loading={actionLoading}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        conflictName={activeConflict?.Conflict_Name || ''}
        loading={actionLoading}
      />
    </div>
  );
};

export default Conflicts;
