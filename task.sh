###################
echo "----------------- WHO AM I? --------------------------"
echo "I'm $(whoami)"
groups "$(whoami)"
echo "-----------------------------------------------------"

# Delete destination folder
echo "----------------- Deleting destination folder --------------------------"
rm -R ./output/*

# Starting conversion 
npm start

###################