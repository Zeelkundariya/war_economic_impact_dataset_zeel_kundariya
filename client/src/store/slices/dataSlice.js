import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunk: Fetch Dashboard Aggregate Stats
export const fetchDashboardStats = createAsyncThunk(
  'data/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const endpoints = [
        '/stats/total-conflicts',
        '/stats/ongoing-conflicts',
        '/stats/resolved-conflicts',
        '/stats/highest-inflation',
        '/stats/lowest-gdp',
        '/stats/highest-poverty',
        '/stats/highest-food-insecurity',
        '/stats/highest-currency-gap',
        '/stats/highest-war-cost',
        '/stats/highest-reconstruction-cost'
      ];

      const responses = await Promise.all(
        endpoints.map(ep => api.get(ep).catch(() => ({ data: null })))
      );

      return {
        totalConflicts: responses[0].data?.totalConflicts ?? responses[0].data?.count ?? 0,
        ongoingConflicts: responses[1].data?.ongoingConflicts ?? responses[1].data?.count ?? 0,
        resolvedConflicts: responses[2].data?.resolvedConflicts ?? responses[2].data?.count ?? 0,
        highestInflation: responses[3].data,
        lowestGdp: responses[4].data,
        highestPoverty: responses[5].data,
        highestFoodInsecurity: responses[6].data,
        highestCurrencyGap: responses[7].data,
        highestWarCost: responses[8].data,
        highestReconstructionCost: responses[9].data,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch aggregate stats');
    }
  }
);

// Async Thunk: Fetch Conflicts (Paginated, Sorted, Filtered, or Searched)
export const fetchConflicts = createAsyncThunk(
  'data/fetchConflicts',
  async (params, { rejectWithValue }) => {
    try {
      let url = '/conflicts';
      let queryParams = {};

      if (params.sort) {
        queryParams.sort = params.sort;
      } else if (params.keyword) {
        queryParams.keyword = params.keyword;
      } else if (params.region) {
        url = '/search/conflicts';
        queryParams.region = params.region;
      } else if (params.country) {
        url = '/search/conflicts';
        queryParams.country = params.country;
      } else if (params.type) {
        url = '/search/conflicts';
        queryParams.type = params.type;
      } else if (params.status) {
        url = '/search/conflicts';
        queryParams.status = params.status;
      } else if (params.inflation) {
        url = '/search/economic';
        queryParams.inflation = params.inflation;
      } else if (params.poverty) {
        url = '/search/economic';
        queryParams.poverty = params.poverty;
      } else if (params.gdp) {
        url = '/search/economic';
        queryParams.gdp = params.gdp;
      } else if (params.currency) {
        url = '/search/economic';
        queryParams.currency = params.currency;
      } else if (params.sector) {
        url = '/search/sector';
        queryParams.name = params.sector;
      } else if (params.blackMarketGoods) {
        url = '/search/black-market';
        queryParams.goods = params.blackMarketGoods;
      } else {
        queryParams.page = params.page || 1;
        queryParams.limit = params.limit || 10;
      }

      const response = await api.get(url, { params: queryParams });
      
      return {
        data: response.data,
        page: params.page || 1,
        limit: params.limit || 10,
        isPaginated: !params.sort && !params.keyword && !params.region && !params.country && !params.type && !params.status && !params.inflation && !params.poverty && !params.gdp && !params.currency && !params.sector && !params.blackMarketGoods
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch conflicts list');
    }
  }
);

// Async Thunk: Create Conflict
export const createConflict = createAsyncThunk(
  'data/createConflict',
  async (conflictData, { rejectWithValue }) => {
    try {
      const response = await api.post('/conflicts', conflictData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create conflict');
    }
  }
);

// Async Thunk: Update Conflict
export const updateConflict = createAsyncThunk(
  'data/updateConflict',
  async ({ id, conflictData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/conflicts/${id}`, conflictData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update conflict');
    }
  }
);

// Async Thunk: Delete Conflict (Soft Delete)
export const deleteConflict = createAsyncThunk(
  'data/deleteConflict',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/conflicts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete conflict');
    }
  }
);

// Async Thunk: Fetch Users List (Admin Only)
export const fetchUsers = createAsyncThunk(
  'data/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users list');
    }
  }
);

// Async Thunk: Update User Role (Admin Only)
export const updateUserRole = createAsyncThunk(
  'data/updateUserRole',
  async ({ id, isAdmin }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${id}/role`, { isAdmin });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update user role');
    }
  }
);

// Async Thunk: Delete User (Admin Only)
export const deleteUser = createAsyncThunk(
  'data/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete user');
    }
  }
);

const initialState = {
  conflicts: [],
  selectedConflict: null,
  totalCount: 0,
  page: 1,
  limit: 10,
  loading: false,
  error: null,
  dashboardStats: null,
  statsLoading: false,
  users: [],
  filters: {
    sort: '',
    keyword: '',
    region: '',
    country: '',
    type: '',
    status: '',
    inflation: '',
    poverty: '',
    gdp: '',
    currency: '',
    sector: '',
    blackMarketGoods: ''
  }
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; // Reset to page 1 on filter change
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 1;
    },
    selectConflict: (state, action) => {
      state.selectedConflict = action.payload;
    },
    clearDataError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.statsLoading = false;
      })
      // Fetch Conflicts
      .addCase(fetchConflicts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConflicts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.isPaginated) {
          state.conflicts = action.payload.data;
          // Note: Since backend returns standard array, we count totalCount or use array length
          state.totalCount = 100; // Mock or count dynamically if headers exist
          state.page = action.payload.page;
        } else {
          state.conflicts = action.payload.data;
          state.totalCount = action.payload.data.length;
        }
      })
      .addCase(fetchConflicts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Conflict
      .addCase(createConflict.fulfilled, (state, action) => {
        state.conflicts = [action.payload, ...state.conflicts];
      })
      // Update Conflict
      .addCase(updateConflict.fulfilled, (state, action) => {
        state.conflicts = state.conflicts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      // Delete Conflict
      .addCase(deleteConflict.fulfilled, (state, action) => {
        state.conflicts = state.conflicts.filter((item) => item._id !== action.payload);
      })
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update User Role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u._id === action.payload._id ? action.payload : u
        );
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  }
});

export const {
  setFilters,
  setPage,
  setLimit,
  resetFilters,
  selectConflict,
  clearDataError
} = dataSlice.actions;

export default dataSlice.reducer;
