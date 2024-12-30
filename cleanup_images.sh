#!/bin/bash

# Directory variables
FORCE_DELETE=false
while getopts "f" opt; do
  case $opt in
    f)
      FORCE_DELETE=true
      ;;
    *)
      echo "Usage: $0 [-f] <image_directory> [source_directory]"
      exit 1
      ;;
  esac
done
shift $((OPTIND -1))

IMAGE_DIR="$1"  # First argument: directory containing images
SRC_DIR="${2:-./src}"  # Second argument: source code directory to search (default: ./src)

if [[ -z "$IMAGE_DIR" ]]; then
  echo "Usage: $0 [-f] <image_directory> [source_directory]"
  exit 1
fi

if [[ ! -d "$IMAGE_DIR" || ! -d "$SRC_DIR" ]]; then
  echo "Both arguments must be valid directories."
  exit 1
fi

# Array to store unreferenced images
UNREFERENCED_IMAGES=()

# Iterate over images in the given folder
for IMAGE in "$IMAGE_DIR"/*; do
  if [[ -f "$IMAGE" ]]; then
    IMAGE_NAME=$(basename "$IMAGE")
    IMAGE_DIR_NAME=$(basename "$(dirname "$IMAGE")")
    SEARCH_PATTERN="$IMAGE_DIR_NAME/$IMAGE_NAME"

    # Search for references in the source directory
    if ! grep -r --include="*.*" "$SEARCH_PATTERN" "$SRC_DIR" >/dev/null 2>&1; then
      UNREFERENCED_IMAGES+=("$IMAGE")
    fi
  fi
done

# Check if there are unreferenced images
if [[ ${#UNREFERENCED_IMAGES[@]} -eq 0 ]]; then
  echo "No unreferenced images found."
  exit 0
fi

if [[ "$FORCE_DELETE" == true ]]; then
  # Delete all unreferenced images without prompting
  for IMAGE in "${UNREFERENCED_IMAGES[@]}"; do
    if [[ -f "$IMAGE" ]]; then
      rm "$IMAGE"
      echo "Deleted: $IMAGE"
    fi
  done
  exit 0
fi

# Display unreferenced images to the user
echo "Unreferenced images found:" 
for i in "${!UNREFERENCED_IMAGES[@]}"; do
  echo "[$i] ${UNREFERENCED_IMAGES[$i]}"
done

echo ""
echo "Enter the indices of images NOT to delete (separated by spaces), or press Enter to delete all images."
read -p "Your choice: " USER_INPUT

# Determine which images to delete
IMAGES_TO_DELETE=()
if [[ -z "$USER_INPUT" ]]; then
  # User pressed Enter, delete all images
  IMAGES_TO_DELETE=("${UNREFERENCED_IMAGES[@]}")
else
  # User entered indices, exclude these images
  read -a EXCLUDE_INDICES <<< "$USER_INPUT"
  for i in "${!UNREFERENCED_IMAGES[@]}"; do
    if ! [[ " ${EXCLUDE_INDICES[@]} " =~ " $i " ]]; then
      IMAGES_TO_DELETE+=("${UNREFERENCED_IMAGES[$i]}")
    fi
  done
fi

# Delete the selected images
for IMAGE in "${IMAGES_TO_DELETE[@]}"; do
  if [[ -f "$IMAGE" ]]; then
    rm "$IMAGE"
    echo "Deleted: $IMAGE"
  fi
done
