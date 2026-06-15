import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchConflicts, setFilters, setPage, setLimit,
  resetFilters, createConflict, updateConflict, deleteConflict
} from '../store/slices/dataSlice';
import { showToast } from '../store/slices/uiSlice';
import {
  Search, RefreshCw, ChevronLeft, ChevronRight,
  Edit2, Trash2, Plus, AlertCircle, Database, Filter, Zap
} from 'lucide-react';
import ConflictModal from '../components/ConflictModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

/* ── Shared select/input style ──────────────────────────── */
const selectCls = `block w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700
  bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm
  focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500
  transition-all duration-200 cursor-pointer`;

/* ── Status Badge ────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const ongoing = status?.toLowerCase() === 'ongoing';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
      ongoing
        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${ongoing ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
      {status}
    </span>
  );
};

/* ── Shimmer Skeleton row ────────────────────────────────── */
const SkeletonRow = () => (
  <tr>
    {[28, 16, 20, 16, 16, 14, 12, 12, 20, 20, 16].map((w, i) => (
      <td key={i} className="px-5 py-4">
        <div className={`h-4 skeleton rounded w-${w} ${i >= 6 ? 'ml-auto' : ''}`} />
      </td>
    ))}
  </tr>
);

const Conflicts = () => {
  const dispatch = useDispatch();
  const { conflicts, loading, error, page, limit, filters, totalCount } = useSelector((state) => state.data);
  const { role } = useSelector((state) => state.auth);

  const [keywordInput,     setKeywordInput]     = useState(filters.keyword || '');
  const [isCrudModalOpen,  setIsCrudModalOpen]  = useState(false);
  const [isDeleteModalOpen,setIsDeleteModalOpen]= useState(false);
  const [modalMode,        setModalMode]        = useState('create');
  const [activeConflict,   setActiveConflict]   = useState(null);
  const [actionLoading,    setActionLoading]    = useState(false);

  useEffect(() => { dispatch(fetchConflicts({ page, limit, ...filters })); }, [dispatch, page, limit, filters]);
  useEffect(() => { if (error) dispatch(showToast({ message: error, severity: 'error' })); }, [error, dispatch]);

  const handleSearchSubmit = (e) => { e.preventDefault(); dispatch(setFilters({ keyword: keywordInput })); };
  const handleFilterChange = (key, value) => dispatch(setFilters({ [key]: value }));
  const handleReset = () => {
    setKeywordInput('');
    dispatch(resetFilters());
    dispatch(showToast({ message: 'Filters reset', severity: 'info' }));
  };

  const handleCrudSubmit = async (values) => {
    setActionLoading(true);
    try {
      if (modalMode === 'create') {
        await dispatch(createConflict(values)).unwrap();
        dispatch(showToast({ message: 'Conflict entry created!', severity: 'success' }));
      } else {
        await dispatch(updateConflict({ id: activeConflict._id, conflictData: values })).unwrap();
        dispatch(showToast({ message: 'Conflict entry updated!', severity: 'success' }));
      }
      setIsCrudModalOpen(false);
      dispatch(fetchConflicts({ page, limit, ...filters }));
    } catch (err) {
      dispatch(showToast({ message: err || 'Action failed', severity: 'error' }));
    } finally { setActionLoading(false); }
  };

  const handleDeleteConfirm = async () => {
    setActionLoading(true);
    try {
      await dispatch(deleteConflict(activeConflict._id)).unwrap();
      dispatch(showToast({ message: 'Entry deleted successfully!', severity: 'success' }));
      setIsDeleteModalOpen(false);
      dispatch(fetchConflicts({ page, limit, ...filters }));
    } catch (err) {
      dispatch(showToast({ message: err || 'Deletion failed', severity: 'error' }));
    } finally { setActionLoading(false); }
  };

  const totalPages = totalCount ? Math.ceil(totalCount / limit) : '?';

  return (
    <div className="space-y-5">

      {/* ── Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 text-[10px] font-bold uppercase tracking-widest">
              <Database className="h-3 w-3" /> Database
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Conflict Database</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Browse, query, and manage global conflict records and economic impact data
          </p>
        </div>

        <button
          id="add-record-btn"
          onClick={() => { setActiveConflict(null); setModalMode('create'); setIsCrudModalOpen(true); }}
          className="flex items-center gap-2 px-5 py-2.5 premium-gradient-btn text-white font-bold rounded-xl shadow-lg shadow-violet-500/20 cursor-pointer text-sm shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Record
        </button>
      </div>

      {/* ── Filter Panel ──────────────────────────────────── */}
      <div className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-5 animate-fade-up delay-100">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filter & Search</span>
        </div>
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="md:col-span-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
              <Search className="h-4.5 w-4.5" />
            </span>
            <input
              id="conflict-search"
              type="text"
              placeholder="Search by name or country…"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              className={`${selectCls} pl-10`}
            />
          </div>

          {/* Region */}
          <div className="md:col-span-2">
            <select id="region-filter" value={filters.region} onChange={(e) => handleFilterChange('region', e.target.value)} className={selectCls}>
              <option value="">All Regions</option>
              {['Europe','Middle East','East Asia','Africa','South Asia','Central America','South America'].map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <select id="status-filter" value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)} className={selectCls}>
              <option value="">All Statuses</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Sort */}
          <div className="md:col-span-3">
            <select id="sort-filter" value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)} className={selectCls}>
              <option value="">Default Sort</option>
              <option value="Conflict_Name">Name (A–Z)</option>
              <option value="-Inflation_Rate_%">Inflation (High–Low)</option>
              <option value="GDP_Change_%">GDP Change (Highest Loss)</option>
              <option value="-During_War_Unemployment_%">Unemployment (High–Low)</option>
              <option value="-End_Year">End Year (Latest First)</option>
              <option value="Estimated_Reconstruction_Cost_USD">Reconstruction Cost (Low–High)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="md:col-span-1 flex items-center gap-2">
            <button
              id="apply-filter-btn"
              type="submit"
              className="flex-1 py-2.5 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition cursor-pointer text-sm text-center"
            >
              Apply
            </button>
            <button
              type="button"
              id="reset-filter-btn"
              onClick={handleReset}
              title="Reset all filters"
              className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 transition cursor-pointer group"
            >
              <RefreshCw className="h-4.5 w-4.5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </form>
      </div>

      {/* ── Main Table ────────────────────────────────────── */}
      <div className="glass-panel rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden animate-fade-up delay-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm premium-table">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800">
                <th className="px-5 py-3.5">Conflict Name</th>
                <th className="px-5 py-3.5">Country</th>
                <th className="px-5 py-3.5">Region</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Years</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">GDP Δ</th>
                <th className="px-5 py-3.5 text-right">Inflation</th>
                <th className="px-5 py-3.5 text-right">War Cost</th>
                <th className="px-5 py-3.5 text-right">Recon Cost</th>
                <th className="px-5 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 dark:divide-slate-800/60">
              {loading ? (
                Array.from({ length: limit }).map((_, i) => <SkeletonRow key={i} />)
              ) : conflicts.length === 0 ? (
                <tr>
                  <td colSpan="11" className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <AlertCircle className="h-7 w-7 text-slate-400" />
                      </div>
                      <p className="font-bold text-base text-slate-600 dark:text-slate-300">No records found</p>
                      <p className="text-sm">Try relaxing your search terms or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                conflicts.map((conflict, idx) => (
                  <tr
                    key={conflict._id}
                    className="text-slate-700 dark:text-slate-300 hover:bg-violet-50/30 dark:hover:bg-violet-950/10 transition-colors duration-150 animate-fade-up"
                    style={{ animationDelay: `${idx * 30}ms`, animationFillMode: 'both' }}
                  >
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white max-w-[150px] truncate" title={conflict.Conflict_Name}>
                      {conflict.Conflict_Name}
                    </td>
                    <td className="px-5 py-3.5 max-w-[100px] truncate">{conflict.Primary_Country}</td>
                    <td className="px-5 py-3.5">{conflict.Region}</td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{conflict.Conflict_Type}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">
                      {conflict.Start_Year}–{conflict.End_Year || 'Now'}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={conflict.Status} />
                    </td>
                    <td className={`px-5 py-3.5 text-right font-mono font-semibold text-xs ${
                      conflict.GDP_Change_Percentage < 0 ? 'text-rose-500' : 'text-emerald-500'
                    }`}>
                      {conflict.GDP_Change_Percentage != null ? `${conflict.GDP_Change_Percentage}%` : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs">
                      {conflict.Inflation_Rate_Percentage != null ? `${conflict.Inflation_Rate_Percentage}%` : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-slate-900 dark:text-white">
                      {conflict.Cost_of_War_USD ? `$${(conflict.Cost_of_War_USD / 1e9).toFixed(2)}B` : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-violet-600 dark:text-violet-400">
                      {conflict.Estimated_Reconstruction_Cost_USD ? `$${(conflict.Estimated_Reconstruction_Cost_USD / 1e9).toFixed(2)}B` : '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => { setActiveConflict(conflict); setModalMode('edit'); setIsCrudModalOpen(true); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/20 transition-all duration-150 cursor-pointer"
                          title="Edit Record"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => { setActiveConflict(conflict); setIsDeleteModalOpen(true); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-150 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                          title="Delete Record"
                          disabled={role !== 'admin'}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination Bar ────────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-3.5 border-t border-slate-200/60 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Rows per page:</span>
            <select
              id="rows-per-page"
              value={limit}
              onChange={(e) => dispatch(setLimit(parseInt(e.target.value)))}
              className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition cursor-pointer text-slate-700 dark:text-slate-300"
            >
              {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            {totalCount && (
              <span className="ml-2 font-medium">
                {((page - 1) * limit) + 1}–{Math.min(page * limit, totalCount)} of {totalCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="prev-page-btn"
              onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
              disabled={page === 1 || loading}
              className="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 min-w-[80px] text-center">
              Page {page}{totalCount ? ` / ${totalPages}` : ''}
            </span>
            <button
              id="next-page-btn"
              onClick={() => dispatch(setPage(page + 1))}
              disabled={conflicts.length < limit || loading}
              className="p-2 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-violet-600 dark:hover:text-violet-400 transition disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────── */}
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
