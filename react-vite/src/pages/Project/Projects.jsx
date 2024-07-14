import React from "react";
import { TrashIcon, PlusIcon, CommandLineIcon, GlobeAltIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ProjectAPI } from "../../api";


export default function ProjectPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  React.useEffect(() => {
    document.title = "Projects | Buildify";
    ProjectAPI.listUserProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  if (projects.length === 0) {
    return <h1>Loading...</h1>;
  }

  console.log(projects);
  return (
    <div className="m-10">
      {/* Page Heading */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-extrabold  leading-6 text-gray-900">
          Your Projects
        </h1>
        <p className="mt-4 max-w-4xl text-sm text-gray-500">
          Workcation is a property rental website. Etiam ullamcorper massa
          viverra consequat, consectetur id nulla tempus. Fringilla egestas
          justo massa purus sagittis malesuada.
        </p>
      </div>

      {/* Projects List */}

      <div className="mt-10">
        <ul
          role="list"
          className="grid grid-cols-4 gap-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <li
              key={project.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="text-center p-4">
                <GlobeAltIcon
                  className="mx-auto h-10 w-10 text-gray-400"
                  aria-hidden="true"
                />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {project.description}
                </p>
                <div className="mt-6 flex justify-around">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() =>
                      navigate(`/project/create?project_id=${uuidv4}`)
                    }
                  >
                    <TrashIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Delete Project
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() =>
                      navigate(`/project/output?projectId=${project.id}`)
                    }
                  >
                    <CommandLineIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Launch Studio
                  </button>
                </div>
              </div>
            </li>
          ))}
          <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="text-center p-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Create a Project
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new project.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() =>
                    navigate(`/project/create?project_id=${uuidv4}`)
                  }
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  New Project
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
