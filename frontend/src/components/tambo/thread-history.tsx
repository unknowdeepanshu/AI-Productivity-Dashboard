"use client";

import { cn } from "@/lib/utils";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconUser, IconTool, IconPlus } from "@tabler/icons-react";
import {
  type TamboThread,
  useTamboThread,
  useTamboThreadList,
} from "@tambo-ai/react";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  MoreHorizontal,
  Pencil,
  PlusIcon,
  SearchIcon,
  Sparkles,
} from "lucide-react";
import React, { useMemo } from "react";

/**
 * Context for sharing thread history state and functions
 */
interface ThreadHistoryContextValue {
  threads: { items?: TamboThread[] } | null | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
  currentThread: TamboThread;
  switchCurrentThread: (threadId: string) => void;
  startNewThread: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onThreadChange?: () => void;
  position?: "left" | "right";
  updateThreadName: (newName: string, threadId?: string) => Promise<void>;
  generateThreadName: (threadId: string) => Promise<TamboThread>;
}

const ThreadHistoryContext =
  React.createContext<ThreadHistoryContextValue | null>(null);

const useThreadHistoryContext = () => {
  const context = React.useContext(ThreadHistoryContext);
  if (!context) {
    throw new Error(
      "ThreadHistory components must be used within ThreadHistory",
    );
  }
  return context;
};

/**
 * Root component that provides context for thread history
 */
interface ThreadHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  onThreadChange?: () => void;
  children?: React.ReactNode;
  defaultCollapsed?: boolean;
  position?: "left" | "right";
}

const ThreadHistory = React.forwardRef<HTMLDivElement, ThreadHistoryProps>(
  (
    {
      className,
      onThreadChange,
      defaultCollapsed = true,
      position = "left",
      children,
      ...props
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [shouldFocusSearch, setShouldFocusSearch] = React.useState(false);

    const { data: threads, isLoading, error, refetch } = useTamboThreadList();

    const {
      switchCurrentThread,
      startNewThread,
      thread: currentThread,
      updateThreadName,
      generateThreadName,
    } = useTamboThread();

    // Update CSS variable when sidebar collapses/expands
    React.useEffect(() => {
      const sidebarWidth = isCollapsed ? "3rem" : "16rem";
      document.documentElement.style.setProperty(
        "--sidebar-width",
        sidebarWidth,
      );
    }, [isCollapsed]);

    // Focus search input when expanded from collapsed state
    React.useEffect(() => {
      if (!isCollapsed && shouldFocusSearch) {
        setShouldFocusSearch(false);
      }
    }, [isCollapsed, shouldFocusSearch]);

    const contextValue = React.useMemo(
      () => ({
        threads,
        isLoading,
        error,
        refetch,
        currentThread,
        switchCurrentThread,
        startNewThread,
        searchQuery,
        setSearchQuery,
        isCollapsed,
        setIsCollapsed,
        onThreadChange,
        position,
        updateThreadName,
        generateThreadName,
      }),
      [
        threads,
        isLoading,
        error,
        refetch,
        currentThread,
        switchCurrentThread,
        startNewThread,
        searchQuery,
        isCollapsed,
        onThreadChange,
        position,
        updateThreadName,
        generateThreadName,
      ],
    );

    return (
      <ThreadHistoryContext.Provider
        value={contextValue as ThreadHistoryContextValue}
      >
        <div
          ref={ref}
          className={cn(
            "border-flat bg-container h-full flex-none transition-all duration-300",
            position === "left" ? "border-r" : "border-l",
            isCollapsed ? "w-12" : "w-64",
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "flex h-full flex-col",
              isCollapsed ? "px-2 py-4" : "p-4",
            )} // py-4 px-2 is for better alignment when isCollapsed
          >
            {children}
          </div>
        </div>
      </ThreadHistoryContext.Provider>
    );
  },
);
ThreadHistory.displayName = "ThreadHistory";

/**
 * Header component with title and collapse toggle
 */
const ThreadHistoryHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const {
    isCollapsed,
    setIsCollapsed,
    position = "left",
  } = useThreadHistoryContext();

  return (
    <div
      ref={ref}
      className={cn(
        "relative mb-4 flex items-center",
        isCollapsed ? "p-1" : "p-1",
        className,
      )}
      {...props}
    >
      <h2
        className={cn(
          "text-muted-foreground text-sm whitespace-nowrap",
          isCollapsed
            ? "max-w-0 overflow-hidden opacity-0"
            : "max-w-none opacity-100 transition-all delay-75 duration-300",
        )}
      >
        Tambo Conversations
      </h2>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          `bg-container hover:bg-backdrop absolute flex cursor-pointer items-center justify-center rounded-md p-1 transition-colors`,
          position === "left" ? "right-1" : "left-0",
        )}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ArrowRightToLine
            className={cn("h-4 w-4", position === "right" && "rotate-180")}
          />
        ) : (
          <ArrowLeftToLine
            className={cn("h-4 w-4", position === "right" && "rotate-180")}
          />
        )}
      </button>
    </div>
  );
});
ThreadHistoryHeader.displayName = "ThreadHistory.Header";

/**
 * Button to create a new thread
 */
const ThreadHistoryNewButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const { isCollapsed, startNewThread, refetch, onThreadChange } =
    useThreadHistoryContext();

  const handleNewThread = React.useCallback(
    async (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();

      try {
        await startNewThread();
        await refetch();
        onThreadChange?.();
      } catch (error) {
        console.error("Failed to create new thread:", error);
      }
    },
    [startNewThread, refetch, onThreadChange],
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.shiftKey && event.key === "n") {
        event.preventDefault();
        void handleNewThread();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNewThread]);

  return (
    <button
      ref={ref}
      onClick={handleNewThread}
      className={cn(
        "hover:bg-backdrop relative mb-4 flex cursor-pointer items-center rounded-md transition-colors",
        isCollapsed ? "justify-center p-1" : "gap-2 p-2",
      )}
      title="New thread"
      {...props}
    >
      <IconPlus />
      <span
        className={cn(
          "absolute left-8 pb-[2px] text-sm font-medium whitespace-nowrap",
          isCollapsed
            ? "pointer-events-none max-w-0 overflow-hidden opacity-0"
            : "opacity-100 transition-all delay-100 duration-300",
        )}
      >
        New thread
      </span>
    </button>
  );
});
ThreadHistoryNewButton.displayName = "ThreadHistory.NewButton";

/**
 * this user info section in thread history sidebar is just for demo purpose, you can replace it with anything you want, like links, docs, etc.
 *
 */

type ScrollbarType = "profile" | "tool" | "auth";

type ThreadActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  setActive: React.Dispatch<React.SetStateAction<ScrollbarType>>;
};
const ThreadUser = React.forwardRef<HTMLButtonElement, ThreadActionProps>(
  ({ setActive, ...props }, ref) => {
    const { isCollapsed } = useThreadHistoryContext();

    return (
      <button
        ref={ref}
        {...props}
        onClick={() => setActive("profile")}
        className={cn(
          "hover:bg-backdrop relative mb-4 flex cursor-pointer items-center rounded-md transition-colors",
          isCollapsed ? "justify-center p-1" : "gap-2 p-2",
        )}
      >
        <IconUser />
        <h1
          className={cn(
            "absolute left-8 pb-[2px] text-sm font-medium whitespace-nowrap",
            isCollapsed
              ? "pointer-events-none max-w-0 overflow-hidden opacity-0"
              : "opacity-100 transition-all delay-100 duration-300",
          )}
        >
          Dipanshu Vishwakarma
        </h1>
      </button>
    );
  },
);

ThreadUser.displayName = "ThreadHistory.User";
const ThreadTool = React.forwardRef<HTMLButtonElement, ThreadActionProps>(
  ({ setActive, ...props }, ref) => {
    const { isCollapsed } = useThreadHistoryContext();

    return (
      <button
        ref={ref}
        {...props}
        onClick={() => setActive("auth")}
        className={cn(
          "hover:bg-backdrop relative mb-4 flex cursor-pointer items-center rounded-md transition-colors",
          isCollapsed ? "justify-center p-1" : "gap-2 p-2",
        )}
      >
        <IconTool />
        <h1
          className={cn(
            "absolute left-8 mt-1 ml-1 pb-[2px] text-sm font-medium whitespace-nowrap",
            isCollapsed
              ? "pointer-events-none max-w-0 overflow-hidden opacity-0"
              : "opacity-100 transition-all delay-100 duration-300",
          )}
        >
          Tools
        </h1>
      </button>
    );
  },
);

ThreadTool.displayName = "ThreadHistory.Tool";

/**
 * Search input for filtering threads
 */
const ThreadHistorySearch = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed, setIsCollapsed, searchQuery, setSearchQuery } =
    useThreadHistoryContext();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const expandOnSearch = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300); // Wait for animation
    }
  };

  return (
    <div ref={ref} className={cn("relative mb-4", className)} {...props}>
      {/*visible when collapsed */}
      <button
        onClick={expandOnSearch}
        className={cn(
          "hover:bg-backdrop absolute left-1/2 -translate-x-1/2 cursor-pointer rounded-md p-1",
          isCollapsed
            ? "pointer-events-auto opacity-100 transition-all duration-300"
            : "pointer-events-none opacity-0",
        )}
        title="Search threads"
      >
        <SearchIcon className="h-4 w-4 text-gray-400" />
      </button>

      {/*visible when expanded with delay */}

      <div
        className={cn(
          //using this as wrapper
          isCollapsed
            ? "pointer-events-none opacity-0"
            : "opacity-100 transition-all delay-100 duration-500",
        )}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          className="bg-container w-full rounded-md py-2 pr-4 pl-10 text-sm focus:outline-none"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
});
ThreadHistorySearch.displayName = "ThreadHistory.Search";

/**
 * List of thread items
 */
const ThreadHistoryList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const {
    threads,
    isLoading,
    error,
    isCollapsed,
    searchQuery,
    currentThread,
    switchCurrentThread,
    onThreadChange,
    updateThreadName,
    generateThreadName,
    refetch,
  } = useThreadHistoryContext();

  const [editingThread, setEditingThread] = React.useState<TamboThread | null>(
    null,
  );
  const [newName, setNewName] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Handle click outside name editing input
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editingThread &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setEditingThread(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingThread]);

  // Focus input when entering edit mode
  React.useEffect(() => {
    if (editingThread) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [editingThread]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setEditingThread(null);
    }
  };

  // Filter threads based on search query
  const filteredThreads = useMemo(() => {
    // While collapsed we do not need the list, avoid extra work.
    if (isCollapsed) return [];

    if (!threads?.items) return [];

    const query = searchQuery.toLowerCase();
    return threads.items.filter((thread: TamboThread) => {
      const nameMatches = thread.name?.toLowerCase().includes(query) ?? false;
      const idMatches = thread.id.toLowerCase().includes(query);

      return idMatches ? true : nameMatches;
    });
  }, [isCollapsed, threads, searchQuery]);

  const handleSwitchThread = async (threadId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    try {
      switchCurrentThread(threadId);
      onThreadChange?.();
    } catch (error) {
      console.error("Failed to switch thread:", error);
    }
  };

  const handleRename = (thread: TamboThread) => {
    setEditingThread(thread);
    setNewName(thread.name ?? "");
  };

  const handleGenerateName = async (thread: TamboThread) => {
    try {
      await generateThreadName(thread.id);
      await refetch();
    } catch (error) {
      console.error("Failed to generate name:", error);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingThread) return;

    try {
      await updateThreadName(newName, editingThread.id);
      await refetch();
      setEditingThread(null);
    } catch (error) {
      console.error("Failed to rename thread:", error);
    }
  };

  // Content to show
  let content;
  if (isLoading) {
    content = (
      <div
        ref={ref}
        className={cn("text-muted-foreground p-2 text-sm", className)}
        {...props}
      >
        Loading threads...
      </div>
    );
  } else if (error) {
    content = (
      <div
        ref={ref}
        className={cn(
          `text-destructive p-2 text-sm whitespace-nowrap ${isCollapsed ? "max-w-0 overflow-hidden opacity-0" : "opacity-100"}`,
          className,
        )}
        {...props}
      >
        Error loading threads
      </div>
    );
  } else if (filteredThreads.length === 0) {
    content = (
      <div
        ref={ref}
        className={cn(
          `text-muted-foreground p-2 text-sm whitespace-nowrap ${isCollapsed ? "max-w-0 overflow-hidden opacity-0" : "opacity-100"}`,
          className,
        )}
        {...props}
      >
        {searchQuery ? "No matching threads" : "No previous threads"}
      </div>
    );
  } else {
    content = (
      <div className="space-y-1">
        {filteredThreads.map((thread: TamboThread) => (
          <div
            key={thread.id}
            onClick={async () => await handleSwitchThread(thread.id)}
            className={cn(
              "hover:bg-backdrop group flex cursor-pointer items-center justify-between rounded-md p-2",
              currentThread?.id === thread.id ? "bg-muted" : "",
              editingThread?.id === thread.id ? "bg-muted" : "",
            )}
          >
            <div className="flex-1 text-sm">
              {editingThread?.id === thread.id ? (
                <form
                  onSubmit={handleNameSubmit}
                  className="flex flex-col gap-1"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-background w-full rounded-sm px-1 text-sm font-medium focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Thread name..."
                  />
                  <p className="text-muted-foreground truncate text-xs">
                    {new Date(thread.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </form>
              ) : (
                <>
                  <span className="line-clamp-1 font-medium">
                    {thread.name ?? `Thread ${thread.id.substring(0, 8)}`}
                  </span>
                  <p className="text-muted-foreground mt-1 truncate text-xs">
                    {new Date(thread.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </>
              )}
            </div>
            <ThreadOptionsDropdown
              thread={thread}
              onRename={handleRename}
              onGenerateName={handleGenerateName}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
        isCollapsed
          ? "pointer-events-none max-h-0 overflow-hidden opacity-0"
          : "pointer-events-auto max-h-full opacity-100",
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
});
ThreadHistoryList.displayName = "ThreadHistory.List";

/**
 * Dropdown menu component for thread actions
 */
const ThreadOptionsDropdown = ({
  thread,
  onRename,
  onGenerateName,
}: {
  thread: TamboThread;
  onRename: (thread: TamboThread) => void;
  onGenerateName: (thread: TamboThread) => void;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="hover:bg-backdrop cursor-pointer rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-popover border-border min-w-[160px] rounded-md border p-1 text-xs shadow-md"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item
            className="text-foreground hover:bg-backdrop flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 transition-colors outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onRename(thread);
            }}
          >
            <Pencil className="h-3 w-3" />
            Rename
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="text-foreground hover:bg-backdrop flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 transition-colors outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onGenerateName(thread);
            }}
          >
            <Sparkles className="h-3 w-3" />
            Generate Name
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryList,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
  ThreadOptionsDropdown,
  ThreadUser,
  ThreadTool,
};
