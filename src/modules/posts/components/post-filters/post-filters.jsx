import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Select from "react-select";

// stores
import { AppDataStore } from "../../../shared/stores/app-data-store";

// services
import { UsersService } from "../../../users/services/users.service";

// components
import { SearchInput } from "../../../shared/components/search-input/search-input";

// utils
import { getFullRoute } from "../../../../utils/get-full-route.helper";

// constants
import { ROUTES } from "../../../../constants/routes.constant";

export const PostFilters = observer(function PostFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState(null);
  const currentUserId = AppDataStore.currentUser.id;

  useEffect(() => {
    async function getUsers() {
      const response = await UsersService.getUsers({ showAll: true, excludeSelf: true });
      setUsers([
        { label: '@Me', value: currentUserId },
        ...response.data.results.map(
          (user) => ({
            label: `${ user.firstName } ${ user.lastName }`,
            value: user.id,
          })
        )
      ]);
    }

    getUsers();
  }, [currentUserId]);

  function onTitleSearch(value) {
    if (!!value) {
      searchParams.set('title', value);
    } else {
      searchParams.delete('title');
    }

    setSearchParams(searchParams);
  }

  function onAuthorSelect(option) {
    if (!!option) {
      searchParams.set('userID', option.value);
    } else {
      searchParams.delete('userID');
    }

    setSearchParams(searchParams);
  }

  function getSelectedAuthorValue() {
    const selectedUserId = +searchParams.get('userID');
    return !!users ? users.find(item => item.id === selectedUserId) : null;
  }

  return (
    <section className="row p-3 mt-4">
      <div
        className="d-flex flex-wrap justify-content-center flex-column justify-content-md-between flex-md-row align-items-md-center">

        <div className="d-flex flex-wrap align-items-center">
          { /* Search by name */ }
          <div className="m-2 flex-grow-1 flex-md-grow-0 position-relative">
            <SearchInput
              initialValue={ searchParams.get('title') }
              searchCallback={ onTitleSearch }
              placeholder='Search By Title'
            />
          </div>

          { /* Search By User */ }
          <div className="m-2 flex-grow-1 flex-md-grow-0" style={ { width: '206px', maxWidth: '100%' } }>
            <Select
              value={ getSelectedAuthorValue() }
              onChange={ onAuthorSelect }
              options={ users }
              isLoading={ !users }
              placeholder='Search By Author'
              isClearable
              isSearchable
            />
            {/*  <ng-select*/ }
            {/*  [items]="usersList"*/ }
            {/*  bindLabel="fullName"*/ }
            {/*  bindValue="id"*/ }
            {/*  [(ngModel)]="queryParams.userID"*/ }
            {/*  (ngModelChange)="onUserSelect($event)"*/ }
            {/*  [loading]="!usersList"*/ }
            {/*  [clearable]="true"*/ }
            {/*  [searchable]="true"*/ }
            {/*  notFoundText="No data"*/ }
            {/*  placeholder="Search By Author"*/ }
            {/*  appendTo="body">*/ }
            {/*</ng-select>*/ }
          </div>
        </div>

        <div className="mt-4 mt-md-0 flex-grow-1 flex-md-grow-0">
          <Link to={ getFullRoute(ROUTES.CREATE_POST) } className="btn btn-primary col-12">Create Post</Link>
        </div>

      </div>
    </section>
  );
});
