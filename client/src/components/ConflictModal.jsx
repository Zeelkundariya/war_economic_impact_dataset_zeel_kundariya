import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X, Loader2 } from 'lucide-react';

const ConflictModal = ({ isOpen, onClose, onSubmit, conflict = null, loading = false }) => {
  const isEdit = !!conflict;

  const formik = useFormik({
    initialValues: {
      Conflict_Name: '',
      Primary_Country: '',
      Region: '',
      Conflict_Type: '',
      Start_Year: '',
      End_Year: '',
      Status: 'Ongoing',
      GDP_Change_Percentage: '',
      Inflation_Rate_Percentage: '',
      Cost_of_War_USD: '',
      Estimated_Reconstruction_Cost_USD: '',
    },
    validationSchema: Yup.object({
      Conflict_Name: Yup.string().required('Conflict name is required'),
      Primary_Country: Yup.string().required('Country is required'),
      Region: Yup.string().required('Region is required'),
      Conflict_Type: Yup.string().required('Type is required'),
      Start_Year: Yup.number()
        .typeError('Start year must be a number')
        .integer('Start year must be an integer')
        .required('Start year is required'),
      End_Year: Yup.number()
        .typeError('End year must be a number')
        .integer('End year must be an integer')
        .nullable(),
      Status: Yup.string().oneOf(['Ongoing', 'Resolved']).required('Status is required'),
      GDP_Change_Percentage: Yup.number().typeError('Must be a number').nullable(),
      Inflation_Rate_Percentage: Yup.number().typeError('Must be a number').nullable(),
      Cost_of_War_USD: Yup.number().typeError('Must be a number').nullable(),
      Estimated_Reconstruction_Cost_USD: Yup.number().typeError('Must be a number').nullable(),
    }),
    onSubmit: (values) => {
      // Cast fields to correct numbers or nulls
      const castedValues = {
        ...values,
        Start_Year: String(values.Start_Year),
        End_Year: values.End_Year ? String(values.End_Year) : '',
        GDP_Change_Percentage: values.GDP_Change_Percentage !== '' ? parseFloat(values.GDP_Change_Percentage) : null,
        Inflation_Rate_Percentage: values.Inflation_Rate_Percentage !== '' ? parseFloat(values.Inflation_Rate_Percentage) : null,
        Cost_of_War_USD: values.Cost_of_War_USD !== '' ? parseFloat(values.Cost_of_War_USD) : null,
        Estimated_Reconstruction_Cost_USD: values.Estimated_Reconstruction_Cost_USD !== '' ? parseFloat(values.Estimated_Reconstruction_Cost_USD) : null,
      };
      onSubmit(castedValues);
    },
  });

  // Load conflict details if in edit mode
  useEffect(() => {
    if (conflict) {
      formik.setValues({
        Conflict_Name: conflict.Conflict_Name || '',
        Primary_Country: conflict.Primary_Country || '',
        Region: conflict.Region || '',
        Conflict_Type: conflict.Conflict_Type || '',
        Start_Year: conflict.Start_Year || '',
        End_Year: conflict.End_Year || '',
        Status: conflict.Status || 'Ongoing',
        GDP_Change_Percentage: conflict.GDP_Change_Percentage !== null && conflict.GDP_Change_Percentage !== undefined ? conflict.GDP_Change_Percentage : '',
        Inflation_Rate_Percentage: conflict.Inflation_Rate_Percentage !== null && conflict.Inflation_Rate_Percentage !== undefined ? conflict.Inflation_Rate_Percentage : '',
        Cost_of_War_USD: conflict.Cost_of_War_USD !== null && conflict.Cost_of_War_USD !== undefined ? conflict.Cost_of_War_USD : '',
        Estimated_Reconstruction_Cost_USD: conflict.Estimated_Reconstruction_Cost_USD !== null && conflict.Estimated_Reconstruction_Cost_USD !== undefined ? conflict.Estimated_Reconstruction_Cost_USD : '',
      });
    } else {
      formik.resetForm();
    }
  }, [conflict, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700/60 animate-in zoom-in-95 duration-200 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700/60">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {isEdit ? 'Edit Conflict Entry' : 'Create Conflict Entry'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={formik.handleSubmit} className="flex-1 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Conflict Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Conflict Name
              </label>
              <input
                name="Conflict_Name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Conflict_Name}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.Conflict_Name && formik.errors.Conflict_Name && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Conflict_Name}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Country
              </label>
              <input
                name="Primary_Country"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Primary_Country}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.Primary_Country && formik.errors.Primary_Country && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Primary_Country}</p>
              )}
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Region
              </label>
              <select
                name="Region"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Region}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">Select Region</option>
                <option value="Europe">Europe</option>
                <option value="Middle East">Middle East</option>
                <option value="East Asia">East Asia</option>
                <option value="Africa">Africa</option>
                <option value="South Asia">South Asia</option>
                <option value="Central America">Central America</option>
                <option value="South America">South America</option>
              </select>
              {formik.touched.Region && formik.errors.Region && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Region}</p>
              )}
            </div>

            {/* Conflict Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Conflict Type
              </label>
              <input
                name="Conflict_Type"
                type="text"
                placeholder="e.g. Civil War, Interstate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Conflict_Type}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.Conflict_Type && formik.errors.Conflict_Type && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Conflict_Type}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                name="Status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Status}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Start Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Start Year
              </label>
              <input
                name="Start_Year"
                type="text"
                placeholder="e.g. 2011"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Start_Year}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.Start_Year && formik.errors.Start_Year && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Start_Year}</p>
              )}
            </div>

            {/* End Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                End Year (Optional)
              </label>
              <input
                name="End_Year"
                type="text"
                placeholder="e.g. 2018"
                disabled={formik.values.Status === 'Ongoing'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Status === 'Ongoing' ? '' : formik.values.End_Year}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white disabled:opacity-50"
              />
              {formik.touched.End_Year && formik.errors.End_Year && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.End_Year}</p>
              )}
            </div>

            {/* GDP Change */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                GDP Change (%)
              </label>
              <input
                name="GDP_Change_Percentage"
                type="text"
                placeholder="e.g. -24.5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.GDP_Change_Percentage}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.GDP_Change_Percentage && formik.errors.GDP_Change_Percentage && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.GDP_Change_Percentage}</p>
              )}
            </div>

            {/* Inflation Rate */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Inflation Rate (%)
              </label>
              <input
                name="Inflation_Rate_Percentage"
                type="text"
                placeholder="e.g. 15.2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Inflation_Rate_Percentage}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.Inflation_Rate_Percentage && formik.errors.Inflation_Rate_Percentage && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Inflation_Rate_Percentage}</p>
              )}
            </div>

            {/* Cost of War */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Cost of War (USD)
              </label>
              <input
                name="Cost_of_War_USD"
                type="text"
                placeholder="e.g. 150000000"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Cost_of_War_USD}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.Cost_of_War_USD && formik.errors.Cost_of_War_USD && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Cost_of_War_USD}</p>
              )}
            </div>

            {/* Reconstruction Cost */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Reconstruction Cost (USD)
              </label>
              <input
                name="Estimated_Reconstruction_Cost_USD"
                type="text"
                placeholder="e.g. 250000000"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Estimated_Reconstruction_Cost_USD}
                className="w-full px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              {formik.touched.Estimated_Reconstruction_Cost_USD && formik.errors.Estimated_Reconstruction_Cost_USD && (
                <p className="text-xs text-rose-500 mt-1">{formik.errors.Estimated_Reconstruction_Cost_USD}</p>
              )}
            </div>
          </div>

          {/* Form Actions footer */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700/60 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isEdit ? 'Save Changes' : 'Create Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConflictModal;
