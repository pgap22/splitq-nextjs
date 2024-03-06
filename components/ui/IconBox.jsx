export default function IconBox({ Icon }) {
    return (
      <div className="flex items-center font-bold gap-2">
        <div className="w-10 aspect-square border border-gradient bg-gradient-principal flex items-center justify-center rounded-full">
          <Icon size={20} />
        </div>
      </div>
    )
  }
  